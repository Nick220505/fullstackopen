import axios from 'axios'
const baseUrl = '/api/users'

const getUserByUsername = async (username) => {
  const response = await axios.get(`${baseUrl}/username/${username}`)
  return response.data
}

const getUserById = async (id) => {
  const response = await axios.get(`${baseUrl}/id/${id}`)
  return response.data
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

export default { getUserByUsername, getAll, getUserById }
