import { useState, useEffect } from 'react'
import FileBase from 'react-file-base64'
import { useDispatch, useSelector } from 'react-redux'
import { createArticle, getArticles, updateArticle } from '../actions/articles'
import { useLocation, useNavigate } from 'react-router-dom'

const Form = () => {
  const navigate = useNavigate()
  const [articleData, setarticleData] = useState({
    title: '',
    description: '',
    image: ''
  })
  const items = useSelector((state) => state.articles)
  const location = useLocation()
  const dispatch = useDispatch()
  const handleSubmit = (e) => {
    e.preventDefault()
    if (location.pathname === '/new') {
      dispatch(createArticle(articleData))
      navigate('/')
    } else {
      dispatch(updateArticle(location.pathname.slice(1, 25), articleData))
      navigate(`/${location.pathname.slice(1, 25)}`)
    }
  }
  const handleChange = (e) => {
    setarticleData({ ...articleData, [e.target.id]: e.target.value })
  }
  useEffect(() => {
    if (location.pathname != '/new' && articleData.description === '') {
      let currArticle = items.find((element) => {
        return element._id === location.pathname.slice(1, 25)
      })
      setarticleData(currArticle)
    }
  }, [articleData])
  return (
    <div className="form">
      <h1>{location.pathname != '/new' ? 'Edit Article' : 'Create Article'}</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <br />
        <input
          id="title"
          type="text"
          value={articleData.title}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="description">Description:</label>
        <br />
        <textarea
          id="description"
          cols="50"
          rows="10"
          onChange={handleChange}
          value={articleData.description}
        ></textarea>
        <br />
        <p>Image:</p>
        <FileBase
          multiple={false}
          type="file"
          onDone={({ base64 }) =>
            setarticleData({ ...articleData, image: base64 })
          }
        />
        <button type="submit">Submit!</button>
      </form>
    </div>
  )
}

export default Form
