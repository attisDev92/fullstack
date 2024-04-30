describe('Blog app', function () {

  beforeEach( function() {

    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    
    const user = {
      name: "User Test",
      username: "UserTest",
      password: "passtest"
    }
    cy.request('POST', 'http://localhost:3001/api/users', user)

    cy.visit('http://localhost:5173')
    cy.contains('Login').click()
  })

  it('loggin form is show', function() {
    cy.contains('Blog App')
    cy.contains('username')
  })

  it('wrong login username and password', function() {
    cy.get('#username').type('user test wrong')
    cy.get('#password').type('password wrong')
    cy.get('#submit-login').click()

    cy.contains('Wrong username or password')
  })

  it('login succeeds', function() {
    cy.get('#username').type('UserTest')
    cy.get('#password').type('passtest')
    cy.get('#submit-login').click()

    cy.contains('blogs')
  })

  describe('when user is logged', function() {

    beforeEach( function() {
      cy.login({
        username: "UserTest",
        password: "passtest"
      })
    })

    it.only('create a blog', function() {
      cy.contains('Create new')
      cy.contains('add new blog').click()

      cy.get('#title').type('Test blog')
      cy.get('#author').type('cypress test')
      cy.get('#url').type('www.prueba.com')
      cy.get('#submit-new-blog').click()

      cy.contains('Test blog')
      cy.contains('cypress test')
      cy.contains('view').click()
      cy.contains('URL: www.prueba.com')
    })

  })

  describe('tests for clicking buttons', function() {
    
    beforeEach( function() {  

      cy.login({
        username: "UserTest",
        password: "passtest"
      })

      cy.newBlog({
        title: 'Test blog',
        author: 'cypress test',
        url: 'www.test.com',
      })

      cy.contains('view').click()
    })

    it('clicking on like button', function() {
      cy.contains('like').click()
      cy.contains('Likes: 1')
    })

    it.only('delete a blog from user', function() {
      cy.contains('Delete').click()
      cy.contains('Test blog').should('not.exist')
    })

  })

  describe('when user not create a blog', function() {
    
    beforeEach( function() {  

      cy.login({
        username: "UserTest",
        password: "passtest"
      })

      cy.newBlog({
        title: 'Test blog',
        author: 'cypress test',
        url: 'www.test.com',
      })

      cy.contains('view').click()
    })

    it.only('delete a blog when dosent create', function() {
      const user = {
        name: "User 2",
        username: "UserTest2",
        password: "passtest2"
      }
      cy.request('POST', 'http://localhost:3001/api/users', user)
  
      cy.login({
        username: "UserTest2",
        password: "passtest2"
      })

      cy.visit('http://localhost:5173')
      cy.contains('view').click()
      cy.contains('Delete').click()
      cy.contains('Test blog')

    })

  })

})