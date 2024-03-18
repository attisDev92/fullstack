const supertest = require('supertest');
const mongoose = require('mongoose');
const helper = require('./test_helpers');
const app = require('../app');

const api = supertest(app);

const Blog = require('../models/Blog');
const User = require('../models/User');

beforeEach( async() => {
    
    await User.deleteMany({ })
    
    await Blog.deleteMany({ })

    for(let blog of helper.initialBlogs) {
        let blogObject = new Blog(blog)
        await blogObject.save()
    }

}, 50000)

describe('test for endpoints from blog API api/blogs', () => {

    test('number of initial blogs in DB', async() => {

        const decodedToken = await helper.getAuthoriceToken()
        const token = `Bearer ${decodedToken.token}`

        const response = await api
            .get('/api/blogs')
            .set('Authorization', token)
        
        expect(response.body).toHaveLength(helper.initialBlogs.length)
    });

});

describe('test for verify the response properties', () => {
    
    test('verify de property ID', async() => {
        
        const decodedToken = await helper.getAuthoriceToken()
        const token = `Bearer ${decodedToken.token}`

        const response =  await api
            .get('/api/blogs')
            .set('Authorization', token)

        expect(response.body[0].id).toBeDefined()
    });

});

describe('tests for post method', () => {

    test('create a new blog', async() => {
        
        const decodedToken = await helper.getAuthoriceToken()
        const token = `Bearer ${decodedToken.token}`

        const user = await User.findOne({ username: decodedToken.username })

        let newBlog = helper.newBlog
        newBlog.userId = user._id

        await api
            .post('/api/blogs')
            .set('Authorization', token)
            .send(newBlog)
            .expect(201)

        const blogs = await helper.blogsInDB()
        expect(blogs).toHaveLength(helper.initialBlogs.length + 1)

        const titles = blogs.map(blog => blog.title)
        expect(titles).toContain(helper.newBlog.title)
    });

    test('post blog without likes', async() => {
        const decodedToken = await helper.getAuthoriceToken()
        const token = `Bearer ${decodedToken.token}`

        const user = await User.findOne({ username: decodedToken.username })

        let newBlog = helper.blogWithoutLikes
        newBlog.userId = user._id

        await api
            .post('/api/blogs')
            .set('Authorization', token)
            .send(newBlog)
            .expect(201)

        const blogs = await helper.blogsInDB()
        expect(blogs).toHaveLength(helper.initialBlogs.length + 1)

        const blogSaved = blogs.find(blog => blog.title === "Blog without likes")
        expect(blogSaved).toHaveProperty('likes')
        expect(blogSaved.likes).toEqual(0);
    });

    test('post without tittle or likes property', async() => {

        const decodedToken = await helper.getAuthoriceToken()
        const token = `Bearer ${decodedToken.token}`

        const user = await User.findOne({ username: decodedToken.username })

        let newBlog = helper.incompleteBlog
        newBlog.userId = user._id

        await api
            .post('/api/blogs')
            .set('Authorization', token)
            .send(newBlog)
            .expect(400)

        const blogs = await helper.blogsInDB()
        expect(blogs).toHaveLength(helper.initialBlogs.length)

        const urls = blogs.map(blog => blog.url)
        expect(urls).not.toContain('http://notAGoodRequest.html')
    })

});

describe('tests for updated information of blogs', () => {

    test('updated likes number for the first blog from 7 to 15', async() => {

        const decodedToken = await helper.getAuthoriceToken()
        const token = `Bearer ${decodedToken.token}`

        const user = await User.findOne({ username: decodedToken.username })

        const blogsAtStart = await helper.blogsInDB()
        const blogToUpdate = await Blog.findOne({ title: "React patterns" })
        blogToUpdate.user = user._id
        blogToUpdate.save()

        const blogToUpdateLikes = {
            likes: 15
        }

        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .set('Authorization', token)
            .send(blogToUpdateLikes)
            .expect(200)

        const blogsUpdated = await helper.blogsInDB()
        const blogUpdated = blogsUpdated.find(blog => blog.title === 'React patterns')
        expect(blogUpdated.likes).toBe(15)

    });

});

describe('delete a blog by delete method', () => {

    test('delete a post', async() => {

        const decodedToken = await helper.getAuthoriceToken()
        const token = `Bearer ${decodedToken.token}`

        const user = await User.findOne({ username: decodedToken.username })

        const blogToDelete = await Blog.findOne({ title: "React patterns" })
        blogToDelete.user = user._id
        blogToDelete.save()

        await api
            .delete(`/api/blogs/${blogToDelete._id}`)
            .set({ Authorization: token })
            .expect(204)

        const blogsAtEnd = await helper.blogsInDB()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

        const titles = blogsAtEnd.map(blog => blog.title)
        expect(titles).not.toContain(blogToDelete.title)
    });

});


afterAll(() => {
    mongoose.connection.close()
});
