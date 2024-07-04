import { forwardRef, useImperativeHandle, useState } from 'react'
import Button from '@mui/material/Button'

const Togglable = forwardRef(
  ({ buttonLabel1, buttonLabel2, children }, refs) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
      setVisible(!visible)
    }

    useImperativeHandle(refs, () => {
      return { toggleVisibility }
    })

    return (
      <div className='togglabe__container'>
        <div style={hideWhenVisible}>
          <Button variant='outlined' onClick={toggleVisibility}>
            {buttonLabel1}
          </Button>
        </div>
        <div style={showWhenVisible} className='togglableContent'>
          {children}
          <Button variant='outlined' onClick={toggleVisibility}>
            {buttonLabel2}
          </Button>
        </div>
      </div>
    )
  },
)

Togglable.displayName = 'Togglable'

export default Togglable
