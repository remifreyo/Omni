import { combineReducers } from 'redux'
import articles from './articles'
import authReducer from './auth'

export default combineReducers({ articles, authReducer })
