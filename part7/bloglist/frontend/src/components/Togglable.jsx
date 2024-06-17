import React from 'react'
import { useState, forwardRef, useImperativeHandle } from 'react'
import Button from '@mui/material/Button'
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
        <Button
          className={`${buttonText}-button`}
          onClick={toggleVisibility}
          variant="contained"
          sx={{ marginTop: 2, marginBottom: 2 }}
        >
          {buttonText}
        </Button>
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
