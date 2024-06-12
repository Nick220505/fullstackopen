import { useState, useEffect } from 'react'
import countryService from '../services/countryService'

export const useField = type => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

export const useCountry = name => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    if (name !== '') {
      countryService
        .getByName(name)
        .then(country => setCountry({
          ...country,
          found: true
        }))
        .catch(() => setCountry({ notFound: true }))
    }
  }, [name])

  return country
}
