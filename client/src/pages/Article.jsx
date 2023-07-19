import { useSelector } from 'react-redux'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteArticle } from '../actions/articles'
import CommentSection from '../components/CommentSection'

const Article = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [article, setArticle] = useState(null)
  const items = useSelector((state) => state.articles)
  const [user, setUser] = useState(null)
  let { id } = useParams()
  useEffect(() => {
    let currArticle = items.find((element) => {
      return element._id === id
    })
    setArticle(currArticle)

    setUser(JSON.parse(localStorage.getItem('profile')))
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
        <p>Written By: {article.author}</p>
        <p>
          Categories:{' '}
          {article.categories.length > 1
            ? article.categories.map((category) => {
                switch (category) {
                  case '64b7efe040d0677f80eb1d4e':
                    return 'Music '
                  case '64b7efe740d0677f80eb1d7e':
                    return 'Finance '
                  case '64b7efb540d0677f80eb1cbe':
                    return 'Technology '
                  case '64b7efee40d0677f80eb1dc5':
                    return 'Marketing '
                  case '64b7f575f4be0d3fb9bcbf84':
                    return 'Film'
                  default:
                    return 'None'
                }
              })
            : 'None'}
        </p>
        <p>{article.description}</p>
      </section>
      {user !== null && article.author === user.result.name ? (
        <div className="article-details-btns">
          <Link to={`/${id}/edit`} replace>
            <button>Edit</button>
          </Link>
          <button
            onClick={() => {
              dispatch(deleteArticle(article._id))
              navigate('/')
            }}
          >
            Delete
          </button>
        </div>
      ) : null}

      <div className="comment-section">
        <CommentSection article={article} />
      </div>
    </div>
  ) : null
}

export default Article
