import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('tests for Blog component', () => {

  const mockHandleDelete = jest.fn() 
  const mockHandleUpdate = jest.fn()

  beforeEach(() => {
    const blog = {
      title: "Titulo de prueba",
      author: "Autor de prueba",
      likes:1,
      url: 'www.prueba.com',
      user: {
        name: "nombre de prueba"
      }
    }

    render(<Blog 
      blog={blog} 
      handleDeleteBlog={mockHandleDelete}
      handleUpdateBlog={mockHandleUpdate}
    />)
  
  })
  
  test('render title and author from component Blog', async() => {  
    
    const titleElement  = screen.getByText('Titulo de prueba')
    const authorElement = screen.getByText('Author: Autor de prueba')


    expect(titleElement).toBeInTheDocument()
    expect(authorElement).toBeInTheDocument()
  
  })

  test('click on button show', async() => {
    
    const user = userEvent.setup()

    const button = screen.getByText('view')
    await user.click(button)

    expect(button).toBeInTheDocument()
  })

  test.skip('test clicking on like button twice', async() => {

    const user = userEvent.setup()

    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    const likeButton = screen.getByText('like')

    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockHandleUpdate).toHaveBeenCalledTimes(2);
  })

})
