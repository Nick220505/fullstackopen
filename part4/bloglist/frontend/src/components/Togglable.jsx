import { useState, forwardRef, useImperativeHandle } from 'react'

const Togglable = forwardRef(({ children, buttonLabel }, ref) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => setVisible(!visible)

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      {visible && children}
      <button onClick={toggleVisibility}>
        {visible ? 'cancel': buttonLabel}
      </button>
    </div>
  )
})

export default Togglable