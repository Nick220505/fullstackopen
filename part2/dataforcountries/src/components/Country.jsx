import { useState, useEffect } from 'react'
import countryService from '../services/countries'

const Country = ({ country }) => {

    const [countryWeatherInfo, setCountryWeatherInfo] = useState({})

    useEffect(() => {
        if (Object.keys(country).length !== 0) {
            const [lat, lng] = country.capitalInfo.latlng
            countryService
                .getWeatherInfo(lat, lng)
                .then(weatherInfo => setCountryWeatherInfo(weatherInfo))
        }
    }, [country])

    if (Object.keys(country).length === 0 || Object.keys(countryWeatherInfo).length === 0) {
        return null
    }

    return (
        <div>
            <h2>{country.name.common}</h2>
            <p>capital {country.capital.join(' ')}</p>
            <p>area {country.area}</p>
            <h3>languages</h3>
            <ul>
                {Object.values(country.languages).map(language => (
                    <li key={language}>{language}</li>
                ))}
            </ul>
            <img
                alt={country.flags.alt}
                src={country.flags.png}
            />
            <h3>Weather in {country.capital[0]}</h3>
            <p>temperature {countryWeatherInfo.main.temp} Celcius</p>
            <img
                alt={countryWeatherInfo.weather[0].description}
                src={`https://openweathermap.org/img/wn/${countryWeatherInfo.weather[0].icon}@2x.png`}
            />
            <p>wind {countryWeatherInfo.wind.speed} m/s</p>
        </div>
    )
}

export default Country
