const winston = require('winston');
const env = process.env.ENV_TYPE;
const winstonConfig = {
    level : 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'ui-server' },
    transports: [
        new winston.transports.File({ filename:'error.log', level: 'error'})
    ],
}

const logger = winston.createLogger(winstonConfig);
if (env !== 'prod') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple(),
    }));
}
module.exports = logger;


