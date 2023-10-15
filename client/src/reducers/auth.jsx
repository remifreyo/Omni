import {
  AUTH,
  LOGOUT,
  AUTH_ERROR,
  CLEAR_AUTH_ERROR
} from '../constants/actionTypes'

const authReducer = (state = { authData: null, error: null }, action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem('profile', JSON.stringify({ ...action?.data }))
      return { ...state, authData: action?.data, error: null } // Clear the error on successful authentication
    case LOGOUT:
      localStorage.clear()
      return { ...state, authData: null, error: null } // Clear the error on logout
    case AUTH_ERROR: // Handle authentication error
      return { ...state, error: action.payload }
    case CLEAR_AUTH_ERROR: // Define the CLEAR_AUTH_ERROR action type
      return { ...state, error: null } // Clear the error
    default:
      return state
  }
}

export default authReducer
