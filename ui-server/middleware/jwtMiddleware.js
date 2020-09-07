const jwt = require("jsonwebtoken");
const logger = require("../logging/winston-logger")
const jwtMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token) {
        try {
            let body = jwt.verify(token, process.env.JWT_SECRET);
            if (body) {
                req.jwt = body;
            }
        }
        catch( e ) {
            logger.error("Encountered problem when decoding jwt "+e);
        }

        next();
    }
    else {
        logger.warn(`Path ${req.url} is visited without jwtToken`);
        next()
    }

}
module.exports = {
    jwtMiddleware
}