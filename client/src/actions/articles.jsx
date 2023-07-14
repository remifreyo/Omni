import * as api from '../api'

export const getArticles = () => async (dispatch) => {
  try {
    const { data } = await api.fetchArticles()
    dispatch({ type: 'FETCH_ALL', payload: data })
  } catch (error) {
    console.log(error.message)
  }
}

export const createArticle = (article) => async (dispatch) => {
  try {
    const { data } = await api.createArticle(article)
    dispatch({ type: 'CREATE', payload: data })
  } catch (error) {
    console.log(error)
  }
}
