import * as api from '../api'

const getArticles = () => async (dispatch) => {
  try {
    const { data } = await api.fetchArticles()
    dispatch({ type: 'FETCH_ALL', payload: data })
  } catch (error) {
    console.log(error.message)
  }
}

export default getArticles
