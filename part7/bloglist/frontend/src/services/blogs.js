import axios from 'axios'
const baseUrl = '/api/blogs'

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
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const getById = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const create = async (blog) => {
  const response = await axios.post(baseUrl, blog, getConfig())
  return response.data
}

const update = async (blog) => {
  const response = await axios.put(`${baseUrl}/${blog.id}`, blog, getConfig())
  return response.data
}

const remove = async (id) => {
  await axios.delete(`${baseUrl}/${id}`, getConfig())
}

export default { getAll, getById, create, update, remove, setToken }
