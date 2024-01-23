const config = require('./utils/config');
const express = require('express');
const app = express();
const cors = require('cors');
const blogsRouter = require('./controllers/blogs');
const middleware = require('./utils/middleware');
const logger = require('./utils/logger');
const mongoose = require('mongoose');
const morgan = require('morgan')

logger.info('connecting to ', config.MONGOBD);

mongoose.connect(config.MONGOBD)
    .then(() => {
        logger.info('connected to MonfoDB')
    })
    .catch(error => {
        logger.catch('error connecting database ', error.message)
    });

app.use(morgan(':method :url :status :response-time ms'));
app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use(middleware.requestLogger);

app.use('/api/blogs', blogsRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;

