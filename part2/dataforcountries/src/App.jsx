import { useState, useEffect } from 'react'
import countryService from './services/countries'
import Search from './components/Search'
import Countries from './components/Countries'
import Country from './components/Country'

const App = () => {
  const [searchedCountry, setSearchedCountry] = useState('')
  const [countryNames, setCountryNames] = useState([])
  const [country, setCountry] = useState({})

  const searchCountries = event => setSearchedCountry(event.target.value)

  const showCountry = countryName => {
    countryService
      .getByName(countryName)
      .then(country => {
        setCountry(country)
        setCountryNames([])
      })
  }

  useEffect(() => {
    if (searchedCountry) {
      countryService
        .getAll()
        .then(countries => {
          const updatedCountryNames = countries.map(c => c.name.common).filter(c => c.toLowerCase().includes(searchedCountry.toLowerCase()))
          const foundCountry = updatedCountryNames.find(c => c.toLowerCase() === searchedCountry)
          if (foundCountry) {
            showCountry(foundCountry)
          } else if (updatedCountryNames.length === 1) {
            showCountry(updatedCountryNames[0])
          } else {
            setCountryNames(updatedCountryNames)
            setCountry({})
          }
        })
    }
  }, [searchedCountry])

  return (
    <div>
      <Search
        searchedCountry={searchedCountry}
        searchCountries={searchCountries}
      />
      <Countries
        countryNames={countryNames}
        showCountry={showCountry}
      />
      <Country country={country} />
    </div>
  )
}

export default App
