require('dotenv').config();
const morgan = require('morgan')
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {type: String, minLength:3 ,required: true},
  author: {type: String, minLength:4, required: true},
  url: {type: String, minLength: 8, required:true},
  likes: {type: Number, default: 0}
});

const Blog = mongoose.model('Blog', blogSchema);

const mongoUrl = process.env.MONGODB_URI;
mongoose.connect(mongoUrl);

app.use(morgan(':method :url :status :response-time ms'));
app.use(cors());
app.use(express.json());

app.get('/api/blogs', (req, res) => {
  Blog
    .find({})
    .then(blogs => {
      res.json(blogs)
    })
});

app.post('/api/blogs', (req, res) => {
  const blog = new Blog(req.body)

  blog
    .save()
    .then(result => {
      res.status(201).json(result)
    })
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});