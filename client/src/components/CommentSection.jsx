import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { commentArticle } from '../actions/articles'
import { Button } from '@material-tailwind/react'

const CommentSection = ({ article }) => {
  const [comments, setComments] = useState(article?.comments)
  const [comment, setComment] = useState('')
  const user = JSON.parse(localStorage.getItem('profile'))
  const dispatch = useDispatch()
  useEffect(() => {}, [])
  const handleClick = async () => {
    const finalComment = `${user.result.name}: ${comment}`

    let newComment = await dispatch(commentArticle(finalComment, article._id))
    setComments(newComment)
    setComment('')
  }
  return (
    <div>
      <h3 className="mb- text-lg font-semibold text-gray-900 mb-8">Comments</h3>
      <div className="space-y-4">
        <div>
          {comments?.map((comment, idx) => (
            <div className="flex-shrink-0 mr-3 flex justify-center" key={idx}>
              <img
                className="mr-2 rounded-full w-8 h-8 sm:w-10 sm:h-10"
                src="https://images.unsplash.com/photo-1604426633861-11b2faead63c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80"
                alt=""
              />
              <p className="text-gray-800 w-96">{comment.comment} </p>
            </div>
          ))}

          {user ? (
            <div>
              <br />
              <div>Add a Comment</div>
              <textarea
                label="Comment"
                value={comment}
                cols="70"
                rows="7"
                onChange={(e) => setComment(e.target.value)}
                className="border-solid border-2 border-gray-300 m-4 w-4/5"
              ></textarea>
              <br />
              <Button disabled={!comment} onClick={handleClick}>
                Submit!
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default CommentSection
