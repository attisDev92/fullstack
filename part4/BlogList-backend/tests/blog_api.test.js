const supertest = require('supertest');
const mongoose = require('mongoose');
const helper = require('./test_helpers');
const app = require('../app');

const api = supertest(app);

const Blog = require('../models/blog');

beforeAll( async() => {
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

afterAll(() => {
    mongoose.connection.close()
});
