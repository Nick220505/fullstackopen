import PropTypes from 'prop-types'
import { useState } from 'react'
import Select from 'react-select'
import { useMutation } from '@apollo/client'
import { EDIT_BIRTH_YEAR, ALL_AUTHORS } from '../queries'

const BirthYearForm = ({ authors }) => {
  const [name, setName] = useState('')
  const [birthYear, setBirthYear] = useState('')

  const [editBirthYear] = useMutation(EDIT_BIRTH_YEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  })

  const handleSubmit = (event) => {
    event.preventDefault()

    editBirthYear({ variables: { name, setBornTo: Number(birthYear) } })

    setName('')
    setBirthYear('')
  }

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={handleSubmit}>
        <Select
          options={authors.map((author) => ({
            value: author.name,
            label: author.name,
          }))}
          onChange={(option) => setName(option.value)}
        />
        <div>
          born
          <input
            type="number"
            value={birthYear}
            onChange={(e) => setBirthYear(e.target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

BirthYearForm.propTypes = {
  authors: PropTypes.array,
}

export default BirthYearForm
