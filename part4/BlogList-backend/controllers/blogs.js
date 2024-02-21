const blogsRouter = require('express').Router();
const Blog = require('../models/Blog');

blogsRouter.get('/', async(req, res) => {
    const blogs = await Blog.find({});
    res.json(blogs);
});

blogsRouter.post('/', async(req, res) => {

    const body = req.body;

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    });

    const blogSaved = await blog.save();
    res.json(blogSaved);
    
});

blogsRouter.put('/:id', async(req, res) => {

    const body = req.body;

    const blog = {
        likes: body.likes
    };

    const blogUpdated = await Blog.findOneAndUpdate({ _id: req.params.id }, blog, { new: true })
    const blogSaved = blogUpdated.save()
    res.json(blogSaved)
});

blogsRouter.delete('/:id', async(req, res) => {

    await Blog.deleteOne({ _id: req.params.id })
    res.status(204).end()

});

module.exports = blogsRouter;