const logger = require('../logging/winston-logger');
const subscribeConnect = (io) => {
    io.on("connection", (socket) => {
        logger.info(`New client connection from ${socket.id}`);
        logger.info(socket);
        socket.emit("hello", "Test test");
        logger.info(`Said hello to the socket`);
        let counter = 0;
        logger.info("saying hello to the socket");
        setInterval(() => {
            socket.emit('hello', ++counter);
        }, 300);
    })
}

exports.subscribeConnect = subscribeConnect;