const logger = require('../utils/logger');

const ERROR_HANDLERS = {
    'CastError': res => res.status(400).send({ error: 'malformatted id' }),
    'ValidationError': (res, error) => res.status(400).send({ error: error.message }),
    'JsonWebTokenError': (res, error) => res.status(401).json({ error: error.message }),
    'TokenExpiredError': res => res.status(401).json({ error: 'token expired' }),
    'defaultError': res => res.status(500).end()
}

const errorHandler = (error, req, res, next) => {
    logger.error(error.message);

    const handler = ERROR_HANDLERS[error.name] || ERROR_HANDLERS.defaultError
    handler(res, error)

    next(error);
}

module.exports = errorHandler;