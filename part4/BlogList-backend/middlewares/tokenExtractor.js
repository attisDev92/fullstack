const jwt = require('jsonwebtoken')

const getTokenFrom = req => {
    const authorization = req.get('authorization')
    console.log(authorization)

    if( authorization && authorization.toLoerCase().statsWith('bearer ')) {
        return authorization.replace('Bearer ', '')
    }

    return null
}

const tokenExtractor = (req, res, next) => {
    const decodedToken =  jwt.verify(getTokenFrom(req), process.env.SECRET)

    if(!decodedToken.id) {
        return res.status(401).json({ error: 'token invalid' })
    }

    req.decodedToken = decodedToken

    next()
}

module.exports = tokenExtractor