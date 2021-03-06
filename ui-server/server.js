const express = require('express');
const path = require('path');
const app = express();
//const http = require('http').createServer(app);
//const io = require('socket.io')(http);
const aws = require('aws-sdk');
let {set, get, del, setJson, getJson} = require('./services/redis-service');
const logger = require("./logging/winston-logger");
const {subscribeConnect} = require("./services/socket-io-service");
const morgan = require('morgan');

// Config for env type
let env = process.env.ENV_TYPE;
// Create s3 client
aws.config.update({region:process.env.AWS_REGION})
let icon_s3 = new aws.S3({
    apiVersion: "2006-03-01"
})
// Use the path ./react-build for searching static file
if (env === 'dev') {
    let staticPath = path.join(path.resolve(__dirname, '..', 'user_interface', 'build'));
    app.use(express.static(staticPath));
}
else {
    app.use(express.static(path.join(__dirname, '..', 'react-build')));
}
// Register morgon for request logging
app.use(morgan("common"));
app.get('/icon-img/:filename', function(req, res) {
    let filename = req.params.filename;
    if (!filename) {
        return res.status(400).end("missing filename");
    }
    let options = {
        Bucket: process.env.AWS_USER_ICON_BUCKET,
        Key: filename
    }
    // Check if the file exists
    icon_s3.headObject(options).promise().then(headObj => {
        logger.info(`Got header object for file `, headObj);
        let ext = filename.split('.')[1];
        //res.attachment(filename);
        icon_s3.getObject(options).createReadStream().pipe(res);
    }).catch(err => {
        if (err.code === 'NotFound') {
            res.status(404).end("Cannot read file from server");
        }
        logger.error(err);
    });
});

// Start serving at /
app.get('/*', function(req, res) {
    let staticPath;
    if (env === 'dev') {
        staticPath = path.join(path.resolve(__dirname, '..', 'user_interface', 'build', 'index.html'));
        res.sendFile(staticPath);
    } else {
        res.sendFile(path.join(path.resolve(__dirname, '..'), 'react-build', 'index.html'));
    }
    logger.info(`Request for static content at : ${req.path} `);

});

let port = process.env.PORT || 3001;

let server = app.listen(port, () => {
    logger.info(`listening on *: ${port}`);
})
let io = require('socket.io').listen(server);
subscribeConnect(io);
// Set up SQS
let {createConsumer} = require('./services/aws-sqs-service');
const consumer = createConsumer(async message => {
    let msg = {};
    msg.MessageId = message.MessageId;
    msg.body = JSON.parse(message.Body);
    let receiver = msg.body.receiver;
    logger.info("Received message from SQS " + JSON.stringify(msg));
    let queuedMessages = await getJson(`${receiver}_mentions`);
    if (!queuedMessages) {queuedMessages = [];}
    queuedMessages.push(msg);
    await setJson(`${receiver}_mentions`, queuedMessages);
    // lets notify the user through socket.io
    let socketId = await get(`${receiver}_socket`);
    if (socketId) {
        let nsp = io.of("/mentions");
        let socket = nsp.sockets[socketId];
        if (socket && socket.isConnected) {
            socket.emit("mentions", queuedMessages);
        }
    }


})
consumer.start();


