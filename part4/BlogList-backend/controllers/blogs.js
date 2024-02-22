const blogsRouter = require('express').Router()
const Blog = require('../models/Blog')
const User =  require('../models/User')

blogsRouter.get('/', async(req, res) => {
    const blogs = await Blog
        .find({ })
        .populate('user')

    res.status(200).json(blogs);
})

blogsRouter.post('/', async(req, res) => {

    const { body } = req

    const user = await User.findOne({ _id: body.userId})

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id
    });

    const blogSaved = await blog.save()
    user.blogs = user.blogs.concat(blogSaved._id)
    await user.save()

    res.status(201).json(blogSaved)
    
})

blogsRouter.put('/:id', async(req, res) => {

    const body = req.body;

    const blog = {
        likes: body.likes
    };

    const blogUpdated = await Blog.findOneAndUpdate({ _id: req.params.id }, blog, { new: true })
    const blogSaved = blogUpdated.save()
    res.json(blogSaved)
})

blogsRouter.delete('/:id', async(req, res) => {

    await Blog.deleteOne({ _id: req.params.id })
    res.status(204).end()

})

module.exports = blogsRouter