const logger = require('./utils/logger');
const config = require('./utils/config');
const morgan = require('morgan')
const express = require('express');
const app = express();
const cors = require('cors');
const Blog = require('./models/blog');
const mongoose = require('mongoose');

mongoose.connect(config.MONGOBD);

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

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});