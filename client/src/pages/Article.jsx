import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

const Article = () => {
  const [article, setArticle] = useState(null)
  const items = useSelector((state) => state.articles)
  let { id } = useParams()
  useEffect(() => {
    let currArticle = items.find((element) => {
      return element._id === id
    })
    setArticle(currArticle)
  }, [items, id])
  return article ? (
    <div className="article-details">
      <section>
        <h1>{article.title}</h1>
        <p>{article.createdAt}</p>
        <p>Likes: {article.likeCount}</p>
        <p>{article.description}</p>
      </section>
    </div>
  ) : null
}

export default Article
