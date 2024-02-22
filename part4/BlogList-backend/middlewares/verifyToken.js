const jwt = require('jsonwebtoken')
const User = require('../models/User')

const tokenExtractor = (req, res, next) => {

    const authorization = req.get('authorization')

    if( authorization && authorization.toLoerCase().statsWith('bearer ')) {
        req.token = authorization.replace('Bearer ', '')
        return next()
    }
    req.token = null
    return next()
}

const tokenValidator = async (req, res, next) => {

    const { token } = req

    if(!token) {
        return res.status(401).json({ error: 'token missing' })
    }

    const decodedToken = jwt.verify(token, process.env.SECRET)
    
    if(!decodedToken.id) {
        return res.status(401).json({ error: 'invalid token' })
    }

    req.userToken = decodedToken
    next()
}

module.exports = {
    tokenExtractor,
    tokenValidator
}