import React from 'react'
import { useState, forwardRef, useImperativeHandle } from 'react'

const Togglable = forwardRef(({ children, buttonLabelFirstComponent, buttonLabelSecondComponent }, ref) => {
  const childrenArray = React.Children.toArray(children)
  const [shownComponentIndex, setShownComponentIndex] = useState(0)

  const toggleVisibility = () => {
    setShownComponentIndex(shownComponentIndex === 0 ? 1 : 0)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      {childrenArray[shownComponentIndex]}
      <button onClick={toggleVisibility}>
        {shownComponentIndex === 0 ? buttonLabelFirstComponent: buttonLabelSecondComponent}
      </button>
    </div>
  )
})

export default Togglable