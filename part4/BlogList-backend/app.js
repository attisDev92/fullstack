const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const middleware = require('./middlewares/middleware')
const verifyToken = require('./middlewares/verifyToken')
const errorHandler = require('./middlewares/errorHandler')
const logger = require('./utils/logger')

if (process.env.NODE_ENV === 'test') {  
    const testingRouter = require('./controllers/testing')  
    app.use('/api/testing', testingRouter)
}

const mongoose = require('mongoose')
const morgan = require('morgan')
mongoose.set('strictQuery', false)

logger.info('connecting to ', config.MONGOBD)

mongoose.connect(config.MONGOBD)
    .then(() => {
        logger.info('connected to MongoDB')
    })
    .catch(error => {
        logger.error('error connecting database ', error.message)
    })

app.use(morgan(':method :url :status :response-time ms'))
app.use(cors())
app.use(express.static('build'))
app.use(express.json())

app.use(middleware.requestLogger)

app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/blogs', verifyToken, blogsRouter)

app.use(middleware.unknownEndpoint)
app.use(errorHandler)

module.exports = app