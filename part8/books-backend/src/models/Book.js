const {Schema, model} = require('mongoose')

const schema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    minLength: 2,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'Author',
    require: true,
  },
  published: {
    type: Number,
  },
  genres: [
    {type: String},
  ],
})

module.exports = model('Book', schema)