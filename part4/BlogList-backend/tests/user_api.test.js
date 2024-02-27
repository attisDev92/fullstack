const supertest = require('supertest')
const app = require('../app')
const helpers = require('./test_helpers')
const bcrypt = require('bcrypt')
const User = require('../models/User')

const api = supertest(app)

beforeEach( async() => {
    await User.deleteMany({ })

    const passwordHash = await bcrypt.hash('password', 10)
    const user = {
        username: 'firstUser',
        name: 'first user name',
        passwordHash
    }

    const initialUser = new User(user)
    await initialUser.save()
})

describe('Tests for create new user', () => {

    test('create new user', async() => {
        
        const usersAtStart = await helpers.usersInDB()

        const newUser = {
            username: 'UsernameTest',
            name: 'Name Test',
            password: 'password'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('content-type', /application\/json/)

        const usersAtEnd = await helpers.usersInDB()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
        
        const usersNames = usersAtEnd.map(user => user.username)
        expect(usersNames).toContain(newUser.username)

    })

})

describe('fails request to users api', () => {

    test('no username request', async() => {
        const usersAtStart = await helpers.usersInDB()

        const userWrong = {
            name: 'Name Test',
            password: 'password'
        }

        await api
            .post('/api/users')
            .send(userWrong)
            .expect(400)

        const usersAtEnd = await helpers.usersInDB()
        expect(usersAtEnd).toEqual(usersAtStart)
    })

})

describe('use api with method get', () => {
    test('get de users', async() => {

        const response = await api.get('/api/users')
            .expect(200)
        
        const users = response.body 

        usersName = users.map(user => user.username)
        expect(usersName).toContain('firstUser')

    })
})

