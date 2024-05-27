import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'
const weatherBaseUrl = 'https://api.openweathermap.org/data/2.5/weather'
const apiKey = import.meta.env.VITE_SOME_KEY

const getAll = () => {
    const request = axios.get(`${baseUrl}/all`)
    return request.then(response => response.data)
}

const getByName = name => {
    const request = axios.get(`${baseUrl}/name/${name}`)
    return request.then(response => response.data)
}

const getWeatherInfo = (lat, lng) => {
    const request = axios.get(`${weatherBaseUrl}?lat=${lat}&lon=${lng}&units=metric&appid=${apiKey}`)
    return request.then(response => response.data)
}

export default { getAll, getByName, getWeatherInfo }
