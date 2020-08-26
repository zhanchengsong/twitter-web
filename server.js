const express = require('express');
const path = require('path');
const app = express();
const aws = require('aws-sdk');
// Create s3 client
aws.config.update({region:process.env.AWS_REGION})
let icon_s3 = new aws.S3({
    apiVersion: "2006-03-01"
})
// Use the path ./react-build for searching static file
app.use(express.static(path.join(__dirname, 'react-build')));
app.get('/icon-img/:filename', function(req, res) {
    let filename = req.params.filename;
    if (!filename) {
        return res.status(400).end("missing filename");
    }
    // icon_s3.listObjects(bucketParams, (err, data) => {
    //     if (err) {
    //         console.log(err);
    //     }
    //     else {
    //         console.log(data);
    //     }
    // })
    let options = {
        Bucket: process.env.AWS_USER_ICON_BUCKET,
        Key: filename
    }
    // Check if the file exists
    icon_s3.headObject(options).promise().then(headObj => {
        console.log(headObj);
        let ext = filename.split('.')[1];
        //res.attachment(filename);
        icon_s3.getObject(options).createReadStream().pipe(res);
    }).catch(err => {
        if (err.code === 'NotFound') {
            res.status(404).end("Cannot read file from server");
        }
        console.log(err);
    })
});

// Start serving at /
app.get('/*', function(req, res) {
    console.log(req.path);
    res.sendFile(path.join(__dirname, 'react-build', 'index.html'));
});

app.listen(3001);
console.log("Server started");