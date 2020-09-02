const AWS = require('aws-sdk');
const { Consumer } = require('sqs-consumer');
AWS.config.update({region: 'us-east-1'});
let queueURL = "https://sqs.us-east-1.amazonaws.com/248490469872/Twitter-Notifications";
function createConsumer(messageHandleFunction) {
    const consumer = Consumer.create({
        queueUrl: queueURL,
        handleMessage: async (message) => {
            messageHandleFunction(message);
        },
        sqs: new AWS.SQS()
    });
    return consumer;
}


module.exports = {
    createConsumer: createConsumer
}