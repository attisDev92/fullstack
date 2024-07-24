const mongoose = require('mongoose')
require('dotenv').config()

mongoose.set("strictQuery", false)

const MONGODB_URI = process.env.MONGODB_URL
console.log('conecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })
