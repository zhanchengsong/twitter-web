const logger = require('../logging/winston-logger');
let {set, get, del, getJson, setJson} = require('../services/redis-service');
const subscribeConnect = (io) => {
    const nNsp = io.of('/notifications');
    const cNsp = io.of('/notificationsCount');
    nNsp.on("connection",  (socket => {
        logger.info(`New Notification client connection from ${socket.id}`);
        socket.on("register", data => {
            logger.info("Recevied register event" + JSON.stringify(data) );
            handleSetNameNotification(data.username, socket.id) // store the socket
                .then( p => logger.info(`Set ${data.username} to bind socket ${socket.id}`) )
                .catch (e => {
                    logger.error(e);
                })
        });
        socket.on("disconnect", () => {
            handleDisconnect(socket).then(data => {
                logger.info("Disconnected Socket " + socket.id);
            })
        })

    }))
    cNsp.on("connection",  (socket => {
        logger.info(`New Count client connection from ${socket.id}`);
        socket.on("register", data => {
            logger.info("Recevied register event" + JSON.stringify(data) );
            handleSetNameCount(data.username, socket.id) // store the socket
                .then( p => logger.info(`Set ${data.username} to bind socket ${socket.id}`) )
                .catch (e => {
                    logger.error(e);
                })
        });
        socket.on("disconnect", () => {
            handleDisconnect(socket).then(data => {
                logger.info("Disconnected Socket " + socket.id);
            })
        })

    }))
    io.on("connection", (socket) => {
        logger.warn(`Received Generic connection from socket ${socket.id}`);
    });
}
const handleSetNameNotification =async (username, socketId) => {
    await set(socketId,`${username}_nsocket` ); // Set up a reverse look up as well
    await set(`${username}_nsocket`, socketId);
}
const handleSetNameCount =async (username, socketId) => {
    await set(socketId,`${username}_csocket` ); // Set up a reverse look up as well
    await set(`${username}_csocket`, socketId);
}
const handleDisconnect = async socket => {
    let nameKey = await get(socket.id);
    await del(socket.id);
    if (nameKey) {
        await del(nameKey);
    }

}


exports.subscribeConnect = subscribeConnect;