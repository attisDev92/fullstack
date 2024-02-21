const supertest = require('supertest');
const mongoose = require('mongoose');
const helper = require('./test_helpers');
const app = require('../app');

const api = supertest(app);

const Blog = require('../models/Blog');

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

describe('tests for updated information of blogs', () => {

    test('updated likes number for the first blog from 7 to 15', async() => {

        const blogsAtStart = await helper.blogsInDB()
        const blogToUpdate = blogsAtStart[0]

        const blogToUpdateLikes = {
            likes: 15
        }

        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(blogToUpdateLikes)
            .expect(200)

        const blogsUpdated = await helper.blogsInDB()
        const blogUpdated = blogsUpdated.find(blog => blog.title === 'React patterns')
        expect(blogUpdated.likes).toBe(15)

    });

});

describe('delete a blog by delete method', () => {

    test('delete a post', async() => {

        const blogsAtStart = await helper.blogsInDB()
        const blogToDelete = blogsAtStart[0]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
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
