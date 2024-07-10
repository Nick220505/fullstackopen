import axios from '../utils/apiClient'

const getUserByUsername = async (username) => {
  const response = await axios.get(`/api/users/username/${username}`)
  return response.data
}

const getUserById = async (id) => {
  const response = await axios.get(`/api/users/id/${id}`)
  return response.data
}

const getAll = async () => {
  const response = await axios.get('/api/users')
  return response.data
}

export default { getUserByUsername, getAll, getUserById }
