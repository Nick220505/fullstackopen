import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'

const getByName = async name => {
  const response = await axios.get(`${baseUrl}/name/${name}`)
  return response.data
}

export default {
  getByName
}
