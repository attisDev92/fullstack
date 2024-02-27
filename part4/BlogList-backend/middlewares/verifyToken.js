const jwt = require('jsonwebtoken')

const verifyToken = async(req, res, next) => {

    const authorization = req.get('authorization')

    let token = null

    if( authorization && authorization.toLowerCase().startsWith('bearer ')) {
        token = authorization.replace('Bearer ', '')
    }
    
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

module.exports = verifyToken
