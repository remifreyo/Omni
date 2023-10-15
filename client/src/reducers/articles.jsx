import {
  FETCH_ALL,
  DELETE,
  UPDATE,
  CREATE,
  COMMENT,
  FETCH_ARTICLE
} from '../constants/actionTypes'

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
    case COMMENT:
      return articles.map((article) => {
        if (article._id === action.payload._id) {
          return action.payload
        }
        return article
      })
    case FETCH_ARTICLE:
      return {
        ...state,
        article: action.payload.article,
        comments: action.payload.comments
      }
    default:
      return articles
  }
}
