import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
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
        <h1>{article.title.toUpperCase()}</h1>
        <p>
          {new Date(article.createdAt).toLocaleString('en-us', {
            dateStyle: 'medium',
            timeStyle: 'short'
          })}
        </p>
        <p>Likes: {article.likeCount}</p>
        <p>{article.description}</p>
      </section>
      <div className="article-details-btns">
        <Link to={`/${id}/edit`} replace>
          <button>Edit</button>
        </Link>
        <button onClick={() => {}}>Delete</button>
      </div>
    </div>
  ) : null
}

export default Article
