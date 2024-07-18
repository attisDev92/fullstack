const {Schema, model} = require('mongoose')

const schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minLength: 3,
  },
  born: {
    type: Number,
  },
  books: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Book',
    }
  ]
})

module.exports = model('Author', schema)