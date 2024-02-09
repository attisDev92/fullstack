const supertest = require('supertest');
const mongoose = require('mongoose');
const helper = require('./test_helpers');
const app = require('../app');

const api = supertest(app);

const Blog = require('../models/blog');

beforeEach( async() => {
    await Blog.deleteMany({ });
    
    for(let blog of helper.initialBlogs) {
        let blogObject = new Blog(blog)
        await blogObject.save()
    }
}, 50000)

describe('test for endpoints from blog API api/blogs', () => {

    test('number of initial blogs in DB', async() => {
        const response = await api.get('/api/blogs')
        
        expect(response.body).toHaveLength(helper.initialBlogs.length)
    });

});

describe('test for verify the response properties', () => {
    
    test('verify de property ID', async() => {
        const response =  await api.get('/api/blogs')

        expect(response.body.some(obj => obj.id)).toBeDefined()
    });

});

describe('tests for post method', () => {

    test('create a new blog', async() => {
        
        await api
            .post('/api/blogs')
            .send(helper.newBlog)
            .expect(200)

        const blogs = await helper.blogsInDB()
        expect(blogs).toHaveLength(helper.initialBlogs.length + 1)

        const titles = blogs.map(blog => blog.title)
        expect(titles).toContain(helper.newBlog.title)
    });

    test('post blog without likes', async() => {

        await api
            .post('/api/blogs')
            .send(helper.blogWithoutLikes)
            .expect(200)

        const blogs = await helper.blogsInDB()
        expect(blogs).toHaveLength(helper.initialBlogs.length + 1)

        const blogSaved = blogs.find(blog => blog.title === "Blog without likes")
        expect(blogSaved).toHaveProperty('likes')
        expect(blogSaved.likes).toEqual(0);
    });

    test('post without tittle or likes property', async() => {

        await api
            .post('/api/blogs')
            .send(helper.incompleteBlog)
            .expect(400)

        const blogs = await helper.blogsInDB()
        expect(blogs).toHaveLength(helper.initialBlogs.length)

        const urls = blogs.map(blog => blog.url)
        console.log(urls)
        expect(urls).not.toContain('http://notAGoodRequest.html')
    })

});

afterAll(() => {
    mongoose.connection.close()
});
