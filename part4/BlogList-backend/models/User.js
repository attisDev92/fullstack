const mongoose = require('mongoose')

const userSchema =  new mongoose.Schema({
    username: {
        type: String,
        minLength: 4,
        require: true,
        unique: true
    },
    name: {
        type: String,
        minLength: 5,
        require: true,
    },
    passwordHash: {
        type: String,
        require: true
    }
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passwordHash
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User;