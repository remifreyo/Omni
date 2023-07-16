import { FETCH_ALL, DELETE, UPDATE, CREATE } from '../constants/actionTypes'

export default (articles = [], action) => {
  switch (action.type) {
    case UPDATE:
      return articles.map((article) =>
        article._id === action.payload._id ? action.payload : article
      )
    case DELETE:
      return articles.filter((article) => article._id != action.payload)
    case FETCH_ALL:
      return action.payload
    case CREATE:
      return [...articles, action.payload]
    default:
      return articles
  }
}
