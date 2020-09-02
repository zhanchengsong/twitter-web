const logger = require('../logging/winston-logger');
let {set, get, del, getJson, setJson} = require('../services/redis-service');
const subscribeConnect = (io) => {
    const mentionNsp = io.of('/mentions');
    mentionNsp.on("connection",  (socket => {
        logger.info(`New client connection from ${socket.id}`);
        socket.on("register", data => {
            logger.info("Recevied register event" + JSON.stringify(data) );
            handleSetName(data.username, socket.id) // store the socket
                .then( sendQueuedMessage(data.username, socket) )
                .catch (e => {
                    logger.error(e);
                })
        });
        socket.emit("whom", {});
        socket.on("disconnect", () => {
            handleDisconnect(socket).then(data => {
                logger.info("Disconnected Socket " + socket.id);
            })
        })
        logger.info(`Said whom to the socket`);
    }))
    io.on("connection", (socket) => {
        logger.warn(`Received Generic connection from socket ${socket.id} , this should not happen`);
    });
}
const handleSetName =async (username, socketId) => {
    await set(socketId,`${username}_socket` ); // Set up a reverse look up as well
    await set(`${username}_socket`, socketId);
}
const handleDisconnect = async socket => {
    let nameKey = await get(socket.id);
    await del(socket.id);
    if (nameKey) {
        await del(nameKey);
    }

}
const sendQueuedMessage = async (username, socket) => {
    logger.info("Sending queued messages");
    let queuedMentions = await getJson(`${username}_mentions`);
    logger.debug("Got queued mentions from redis: " + JSON.stringify(queuedMentions));
    if (!queuedMentions) {
        return;
    }
    if (socket.connected) {
        socket.emit("mentions", queuedMentions);
    }
    else {
        throw {msg: "Socket is closed when trying to send message"};
    }

}


exports.subscribeConnect = subscribeConnect;