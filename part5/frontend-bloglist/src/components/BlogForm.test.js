import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('tests for BlogForm componente', () => {

  const mockCreateBlog = jest.fn()
  const userData = {
    user: 'usertest',
    name: 'user test'
  }

  const component = render(<BlogForm 
    handleCreateBlog={mockCreateBlog}
    user={userData}
  />).container

  test('add new blog with the form', async() => {

    const user = userEvent.setup()
    
    const addBlogButton = screen.getByText('add new blog')

    await user.click(addBlogButton)

    const titleInput = component.querySelector('#title')
    const authorInput = component.querySelector('#author')
    const urlInput = component.querySelector('#url')
    const createButton = component.querySelector('button')

    await user.type(titleInput, 'titulo de prueba')
    await user.type(authorInput, 'autor de prueba')
    await user.type(urlInput, 'www.prueba.com')

    await user.click(createButton)

    expect(mockCreateBlog.mock.calls).toHaveLength(1)
    expect(mockCreateBlog.mock.calls[0][0].component).toBe('titulo de prueba')
  })
})
