import { forwardRef, useImperativeHandle, useState } from "react"


const Togglable = forwardRef(({buttonLabel1, buttonLabel2, children}, refs) => {

  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => {
    return {toggleVisibility}
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>
          {buttonLabel1}
        </button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <button onClick={toggleVisibility}>
          {buttonLabel2}
        </button>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'

export default Togglable