const express = require('express');
const path = require('path');
const app = express();
const aws = require('aws-sdk');
let {set, get, del, setJson, getJson} = require('./services/redis-service');
const logger = require("./logging/winston-logger");
const {subscribeConnect} = require("./services/socket-io-service");
const morgan = require('morgan');
const {jwtMiddleware} = require('./middleware/jwtMiddleware');
const {run} = require('./services/kafka-service');
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
app.use(jwtMiddleware);
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
app.get('/notifications', function(req, res){
    let jwt = req.jwt;
    if (!jwt) { // jwt validation failed
        return res.status(403).json({error: "JWTToken is not valid"})
    }
    let username = jwt.Username;
    let msgp = getJson(`${username}_notifications`);
    msgp.then( msg => {
        if (msg) {
            res.send(msg);
        }
        else {
            res.send([]);
        }
    })

})
// Delete a single notification by id
app.delete('/notification', function(req,res){
    let jwt = req.jwt;
    if (!jwt) { // jwt validation failed
        return res.status(403).json({error: "JWTToken is not valid"})
    }
    let username = jwt.Username;
    let msgp = getJson(`${username}_notifications`);
    let mid = req.query.id;
    if (!mid) {
        return res.status(400).json({error: "Missing path param id"})
    }
    msgp.then( msg => {
        if (!msg) {
            res.send({});
        }
        else {
            let deleted = msg.find( m => {return m.MessageId === mid });
            if (deleted) {
                let rest = msg.filter( m => {return m.MessageId !== mid});
                setJson(`${username}_notifications`, rest).then(
                    s => {
                        res.send(deleted);
                    }
                ).catch(err => {
                    logger.error(err);
                    res.status(500).send({error: JSON.stringify(err)});
                })
            }
            else {
                res.send({});
            }
        }
    })
});
app.get('/notificationsCount', function(req, res) {
    let jwt = req.jwt;
    if (!jwt) { // jwt validation failed
        return res.status(403).json({error: "JWTToken is not valid"})
    }
    let username = jwt.Username;
    logger.info("jwt user is " + username );
    let msgp = getJson(`${username}_notifications`);
    msgp.then( msg => {
        if (msg) {
            return res.send({count : msg.length});
        }
        else {
            return res.send({count: 0});
        }
    })
})
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
run(io).catch(console.error);