import axios from 'axios'
// const baseUrl = '/api/blogs'
const baseUrl = 'http://localhost:3001/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const config = {
    headers: { Authorization: token },
  }
  const res = await axios.get(baseUrl, config)
  return res.data
}

const create = async newBlog => {
  const config = {
    headers: { Authorization: token },
  }
  const res = await axios.post(baseUrl, newBlog, config)
  return res.data
}

const update = async (id, blogToUpdated) => {
  const config = {
    headers: { Authorization: token },
  }
  const res = await axios.put(`${baseUrl}/${id}`, blogToUpdated, config)
  return res.data
}

const destroy = async id => {
  const config = {
    headers: { Authorization: token },
  }
  const res = await axios.delete(`${baseUrl}/${id}`, config)
  return res.data
}

const addComment = async (id, comment) => {
  const config = {
    headers: { Authorization: token },
  }
  const res = await axios.post(`${baseUrl}/${id}/comment`, comment, config)
  return res.data
}

export default {
  getAll,
  create,
  update,
  destroy,
  setToken,
  addComment
}
