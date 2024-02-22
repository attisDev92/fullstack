const blogsRouter = require('express').Router()
const Blog = require('../models/Blog')
const User =  require('../models/User')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async(req, res) => {
    const blogs = await Blog
        .find({ })
        .populate('user', { username: 1, name: 1 })

    res.status(200).json(blogs);
})

blogsRouter.get('/:id', async(req, res) => {
    const blog = await Blog.findOne({ _id: req.params.id })
    if (blog) {
        res.status(200).json(blog)
    } else {
        res.status(400).end()
    }
})

blogsRouter.post('/', async(req, res) => {

    const  { body, userToken } = req

    const user = await User.findOne({ _id: userToken.id })

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

    const { body, userToken } = req
    const user = await User.findOne({ _id: userToken.id })

    const blogToUpdate = await Blog.findOne({ _id: req.params.id })

    const blog = {
        likes: body.likes
    };

    if (blogToUpdate.user.toString() === user._id.toString()) {
        const blogUpdated = await Blog.findOneAndUpdate({ _id: req.params.id }, blog, { new: true })
        const blogSaved = blogUpdated.save()
        return res.status(200).json(blogSaved)
    } else {
        return res.status(401).json({ error: 'Unauthorized' })
    }
    
})

blogsRouter.delete('/:id', async(req, res) => {

    const { userToken } = req
    const user = await User.findOne({ _id: userToken.id })

    const blogToDelete = await Blog.findOne({ _id: req.params.id })

    if (blogToDelete.user.toString() === user._id.toString()) {
        await Blog.deleteOne({ _id: params.id })
        return res.status(204).end()
    } else {
        return res.status(401).json({ error: 'Unauthorized' })
    }
})

module.exports = blogsRouter