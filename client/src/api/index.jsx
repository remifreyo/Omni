import axios from 'axios'

const API = axios.create({ baseURL: 'https://omni-backend.onrender.com/' })

export const fetchArticles = () => API.get('/articles')

export const createArticle = (newArticle) => API.post('/articles', newArticle)

export const updateArticle = (id, updatedArticle) =>
  API.put(`${'/articles'}/${id}`, updatedArticle)

export const deleteArticle = (id) => API.delete(`${'/articles'}/${id}`)

export const signIn = (formData) => API.post('users/signin', formData)
export const signUp = (formData) => API.post('users/signup', formData)
export const comment = (value, id) =>
  API.post(`/articles/${id}/commentArticle`, { value })
