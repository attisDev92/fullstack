import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Togglable from './Togglable'

describe.only('test for togglable component', () => {

  let container 

  beforeEach(() => {

    container = render(
      <Togglable 
        buttonLabel1="view"
        buttonLabel2="hide"
      >
        <div className='test-div'>
          togglable content
        </div>
      </Togglable>
    ).container

  })
  
  test('render children', async () => {

    const childrenElement = await screen.findByText('togglable content')
    expect(childrenElement).toBeInTheDocument()

  })

  test('children not displayed', () => {

    const div = container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')

  })

  test('clicking the button show', async () => {

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)
    const div = container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
  })

})