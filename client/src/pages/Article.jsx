import { useSelector } from 'react-redux'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteArticle } from '../actions/articles'
import CommentSection from '../components/CommentSection'
import { Button } from '@material-tailwind/react'

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
    <div className="w-full flex">
      <div className="w-full h-full text-justify bg-gray-700">
        <div className="z-0 bg-white relative mx-auto mt-10 overflow-hidden rounded-t-lg py-32 text-center shadow-lg">
          <p className="text-white">
            Published{' '}
            {new Date(article.createdAt).toLocaleString('en-us', {
              dateStyle: 'medium',
              timeStyle: 'short'
            })}
          </p>
          <h1 className="mt-2 text-5xl font-bold text-white">
            {article.title.toUpperCase()}
          </h1>
          <p className="mt-6 text-lg text-white">
            Written By: {article.author}
          </p>
          <div className="mt-6 flex justify-center space-x-2">
            {article.categories.length > 0
              ? article.categories.map((category) => {
                  return (
                    <Link key={category} to={`/categories`}>
                      <button className="rounded-lg bg-gray-50 px-2 py-1 font-medium text-gray-900 hover:bg-gray-200">
                        {(() => {
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
                        })()}
                      </button>
                    </Link>
                  )
                })
              : 'None'}
          </div>
          <img
            className="-z-10 absolute top-0 left-0 h-full w-full object-cover opacity-70"
            src="https://images.unsplash.com/photo-1553095066-5014bc7b7f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2FsbCUyMGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D&w=1000&q=80"
            alt=""
          />
        </div>
        <article className="h-fit">
          <div className="mx-auto rounded-t-lg bg-white p-16 text-justify shadow-lg">
            <div
              className="text-gray-900 text-lg article-text"
              dangerouslySetInnerHTML={{ __html: article.description }}
            />
            <br />
            {user !== null && article.author === user.result.name ? (
              <div className="text-center">
                <Link
                  to={{
                    pathname: `/${id}/edit`,
                    state: { categories: article.categories }
                  }}
                >
                  <Button className="mr-4">Edit</Button>
                </Link>
                <Button
                  onClick={() => {
                    dispatch(deleteArticle(article._id))
                    navigate('/')
                  }}
                >
                  Delete
                </Button>
              </div>
            ) : null}
          </div>
        </article>

        <div className="comment-section shadow-lg">
          <CommentSection
            key={`comment-section-${article?._id}`}
            article={article}
          />
        </div>
      </div>
    </div>
  ) : null
}

export default Article
