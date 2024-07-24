const { Schema, model } = require('mongoose')

const schema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minLength: 3
  },
  favoriteGenre: {
    type: String,
    required: true,
  },
})

module.exports = model('User', schema)