import axios from 'axios'

const API = axios.create({ baseURL: 'https://omni-backend.onrender.com/' })
// const API = axios.create({ baseURL: 'http://localhost:3000' })

export const fetchArticles = () => API.get('/articles')

export const createArticle = (newArticle) => API.post('/articles', newArticle)

export const updateArticle = (id, updatedArticle) =>
  API.put(`${'/articles'}/${id}`, updatedArticle)

export const deleteArticle = (id) => API.delete(`${'/articles'}/${id}`)

export const fetchArticle = async (id) => {
  try {
    const response = await API.get(`/articles/${id}`)
    return response.data // Assuming the data includes both the article and comments
  } catch (error) {
    // Handle errors, e.g., network issues or server errors
    throw error
  }
}

export const signIn = (formData) => API.post('users/signin', formData)
export const signUp = (formData) => API.post('users/signup', formData)
export const comment = (value, id) =>
  API.post(`/articles/${id}/commentArticle`, { value })
