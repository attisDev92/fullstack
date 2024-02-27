const Blog = require('../models/Blog')
const User = require('../models/User')
const bcrypt = require('bcrypt')
const supertest =  require('supertest')
const app =  require('../app')

const api = supertest(app)

const initialBlogs = [
    {
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
    },
    {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
    },
    {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
    },
    {
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
    },
    {
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
    },
    {
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2
    }
];

const newBlog = {
    title: "Developer history",
    author: "Attis Burnham",
    url: "https://attisdev.com/",
    likes: 5,
    userId: "3273hr3rhuhfu382"
};

const blogWithoutLikes = {
    title: "Blog without likes",
    author: "Attis Burnham",
    url: "https://attisdev.com",
    userId:"3273hr3rhuhfu382"
}

const incompleteBlog = {
    url: "https://notAGoodObject.com",
    likes: 9,
    userId:"3273hr3rhuhfu382"
}

const blogsInDB = async() => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDB = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

const createNewUser = async () => {

    const passwordHash = await bcrypt.hash('password', 10)

    const user = new User({
        username: "UserTest1",
        name: "User Test 1",
        passwordHash
    });

    const userSaved = await user.save()

    return userSaved
}

const getAuthoriceToken = async() => {

    await createNewUser()
    
    const user = {
        username: "UserTest1",
        name: "User Test 1",
        password: "password"
    }

    const token = await api
        .post('/api/login')
        .send(user)
    
    const decodedToken = token.body

    return decodedToken;

}

module.exports = {
    initialBlogs,
    newBlog,
    blogWithoutLikes,
    incompleteBlog,
    blogsInDB,
    usersInDB,
    createNewUser,
    getAuthoriceToken
}