import axios from 'axios'
// const baseUrl = '/api/blogs'
const baseUrl = 'http://localhost:3001/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getConfig = () => ({
  headers: { Authorization: token }
})

const getAll = async () => {
  const res = await axios.get(baseUrl, getConfig())
  return res.data
}

const getBlog = async (id) => {
  const res = await axios.get(`${baseUrl}/${id}`, getConfig())
  return res.data
}

const create = async newBlog => {
  const res = await axios.post(baseUrl, newBlog, getConfig())
  return res.data
}

const update = async (blogToUpdated) => {
  const res = await axios.put(`${baseUrl}/${blogToUpdated.id}`, blogToUpdated, getConfig())
  return res.data
}

const destroy = async id => {
  const res = await axios.delete(`${baseUrl}/${id}`, getConfig())
  return res.data
}

export default {
  getAll,
  getBlog,
  create,
  update,
  destroy,
  setToken,
}
