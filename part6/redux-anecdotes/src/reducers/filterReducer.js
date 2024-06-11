const initialState = ''

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TEXT':
      return action.payload
    default:
      return state
  }
}

export const updateValue = value => {
  return {
    type: 'TEXT',
    payload: value
  }
}

export default filterReducer