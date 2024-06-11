import { useDispatch } from 'react-redux'
import { updateValue } from '../reducers/filterReducer'

const Filter = () => {
  const dispatch = useDispatch()

  const handleChange = ({ target }) => {
    console.log(target.value)
    dispatch(updateValue(target.value))
  }

  return (
    <div style={{
        marginBottom: 10
    }}>
      filter
      <input
        name="query"
        onChange={handleChange}
      />
    </div>
  )
}

export default Filter