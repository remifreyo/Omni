import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { commentArticle } from '../actions/articles'

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
      <h2>Comments</h2>
      {comments?.map((comment, idx) => (
        <p className="text-gray-800" key={idx}>
          {comment.comment}{' '}
        </p>
      ))}

      {user ? (
        <div>
          <div>Write a Comment</div>
          <textarea
            label="Comment"
            value={comment}
            cols="70"
            rows="7"
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
          <br />
          <button disabled={!comment} onClick={handleClick}>
            Submit!
          </button>
        </div>
      ) : null}
    </div>
  )
}

export default CommentSection
