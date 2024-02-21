const supertest = require('supertest')
const bcrypt = require('bcrypt')
const app = require('../app')

const User = require('../models/User');

const api = supertest(app)

beforeEach( async() => {
    await User.deleteMany({ })

    const user = {
        username: 'firstUser',
        name: 'first user name',
        password: 'password'
    }

    const initialUser = new User(user)
    await initialUser.save()
})

describe('Tests for create new user', () => {

    test('create new user', async() => {
        
        const usersAtStart = User.find({})

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
            
        
    })

})

