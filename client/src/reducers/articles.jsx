export default (articles = [], action) => {
  switch (action.type) {
    case 'FETCH_ALL':
      return action.payload
    case 'CREATE':
      return articles
    default:
      return articles
  }
}
