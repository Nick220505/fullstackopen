import React from 'react'
import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = forwardRef(
  (
    {
      children,
      buttonLabelFirstComponent,
      buttonLabelSecondComponent,
      className,
      style,
    },
    ref,
  ) => {
    const childrenArray = React.Children.toArray(children)
    const [shownComponentIndex, setShownComponentIndex] = useState(0)

    const toggleVisibility = () => {
      setShownComponentIndex(shownComponentIndex === 0 ? 1 : 0)
    }

    useImperativeHandle(ref, () => {
      return {
        toggleVisibility,
      }
    })

    const buttonText =
      shownComponentIndex === 0
        ? buttonLabelFirstComponent
        : buttonLabelSecondComponent

    return (
      <div className={className} style={style}>
        {childrenArray[shownComponentIndex]}
        <button className={`${buttonText}-button`} onClick={toggleVisibility}>
          {buttonText}
        </button>
      </div>
    )
  },
)

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
  children: PropTypes.array.isRequired,
  buttonLabelFirstComponent: PropTypes.string.isRequired,
  buttonLabelSecondComponent: PropTypes.string.isRequired,
}

export default Togglable
