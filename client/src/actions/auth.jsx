import { AUTH, AUTH_ERROR } from '../constants/actionTypes'
import * as api from '../api'

export const signin = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData)
    dispatch({ type: AUTH, data })
    navigate('/')
  } catch (error) {
    console.log(error.response.data.message)
    dispatch({ type: AUTH_ERROR, payload: error.response.data.message })
  }
}
export const signup = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData)
    dispatch({ type: AUTH, data })
    navigate('/')
  } catch (error) {
    console.log(error.response.data.message)
  }
}
