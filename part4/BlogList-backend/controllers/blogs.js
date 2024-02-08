const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async(req, res) => {
    const blogs = await Blog.find({});
    res.json(blogs);
});

blogsRouter.post('/', async(req, res, next) => {
        
    const { body } = req;
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    });

    const blogSaved = await blog.save();
    res.json(blogSaved);
    
});

module.exports = blogsRouter;