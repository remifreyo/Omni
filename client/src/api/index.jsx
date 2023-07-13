import axios from 'axios'

const url = 'http://localhost:3000/articles'

export const fetchArticles = () => axios.get(url)
