import axios from '../utils/apiClient'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getConfig = () => {
  return {
    headers: { Authorization: token },
  }
}

const getAll = async () => {
  const request = axios.get('/api/blogs')
  return request.then((response) => response.data)
}

const getById = async (id) => {
  const response = await axios.get(`/api/blogs/${id}`)
  return response.data
}

const create = async (blog) => {
  const response = await axios.post('/api/blogs', blog, getConfig())
  return response.data
}

const update = async (blog) => {
  const response = await axios.put(`/api/blogs/${blog.id}`, blog, getConfig())
  return response.data
}

const remove = async (id) => {
  await axios.delete(`/api/blogs/${id}`, getConfig())
}

export default { getAll, getById, create, update, remove, setToken }
