import * as api from '../api'
import {
  FETCH_ALL,
  DELETE,
  UPDATE,
  CREATE,
  COMMENT
} from '../constants/actionTypes'

export const getArticles = () => async (dispatch) => {
  try {
    const { data } = await api.fetchArticles()
    dispatch({ type: FETCH_ALL, payload: data })
  } catch (error) {
    console.log(error)
  }
}

export const createArticle = (article) => async (dispatch) => {
  try {
    const { data } = await api.createArticle(article)
    dispatch({ type: CREATE, payload: data })
  } catch (error) {
    console.log(error)
  }
}

export const updateArticle = (id, article) => async (dispatch) => {
  try {
    const { data } = await api.updateArticle(id, article)

    dispatch({ type: UPDATE, payload: data })
  } catch (error) {
    console.log(error)
  }
}

export const deleteArticle = (id) => async (dispatch) => {
  try {
    await api.deleteArticle(id)

    dispatch({ type: DELETE })
  } catch (error) {
    console.log(error)
  }
}

export const commentArticle = (value, id) => async (dispatch) => {
  try {
    const { data } = await api.comment(value, id)
    dispatch({ type: COMMENT, payload: data })
  } catch (error) {
    console.log(error)
  }
}
