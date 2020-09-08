const { Kafka } = require('kafkajs')
const logger = require('../logging/winston-logger');
let {set, get, del, setJson, getJson} = require('./redis-service');
const kafka = new Kafka({
    clientId: 'ui-server',
    brokers: [process.env["KAFKA_HOST"]]
})

const consumer = kafka.consumer({groupId: 'frond-end-server'});

const run = async(io) => {
    await consumer.connect();
    await consumer.subscribe({topic: 'twitter-notifications', fromBeginning: true})
    await consumer.run({
        autoCommit:false,
        eachMessage: async ({ topic, partition, message }) => {
            let messageBuf = message.value;
            console.log({
                partition,
                offset: message.offset,
                value: messageBuf.toString(),
            });
            let json = JSON.parse(messageBuf.toString());

            let delivered = await sendSocketEvents(io, json, message.offset);
            if (delivered) {
                logger.info("Message is delivered to Socket.io");
                await consumer.commitOffsets([{topic: topic, partition: partition, offset: message.offset}]);
            } else {
                logger.info("Message is not delivered to Socket.io but stored in Redis");
                await consumer.commitOffsets([{topic: topic, partition: partition, offset: message.offset}]);
            }

        },
    })
}
async function sendSocketEvents(io, message, offset) {
    let msg = {};
    let delivered = false;
    msg.MessageId = offset;
    msg.body = message;
    let receiver = msg.body.receiver;
    logger.info("Received message from Kafka " + JSON.stringify(msg));
    let queuedMessages = await getJson(`${receiver}_notifications`);
    if (!queuedMessages) {queuedMessages = [];}
    queuedMessages.push(msg);
    logger.info("Saving the message to redis");
    await setJson(`${receiver}_notifications`, queuedMessages);
    // lets notify the user through socket.io
    let csocketId = await get(`${receiver}_csocket`);
    let nsocketId = await get(`${receiver}_nsocket`)
    if (csocketId) {
        let cnsp = io.of("/notificationsCount");
        let connectedSockets = cnsp.connected;
        let socket = cnsp.connected[csocketId];
        if (socket) {
            logger.info("Emitting event for count " + queuedMessages.length);
            socket.emit("count", {count: queuedMessages.length});
        }
        delivered = true;
    }
    if (nsocketId) {
        let nnsp = io.of("/notifications");
        let socket = nnsp.sockets[nsocketId];
        if (socket) {
            logger.info("Emitting event for msg " + msg);
            socket.emit("msg", {msg: msg});
        }
    }
    return delivered;

}
module.exports = {
    run
}
