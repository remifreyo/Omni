import { useState, useEffect } from 'react'
import FileBase from 'react-file-base64'
import { useDispatch, useSelector } from 'react-redux'
import { createArticle, getArticles, updateArticle } from '../actions/articles'
import { useLocation, useNavigate } from 'react-router-dom'

const Form = () => {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('profile'))
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
      dispatch(createArticle({ ...articleData, author: user?.result?.name }))
      navigate('/')
    } else {
      dispatch(
        updateArticle(location.pathname.slice(1, 25), {
          ...articleData,
          author: user?.result?.name
        })
      )
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
        <fieldset>
          <legend>Select one or more Categories:</legend>
          <label for="Music">Music</label>
          <input type="checkbox" name="categories" value="Music" id="Music" />
          &nbsp;
          <label for="Technology">Technology</label>
          <input
            type="checkbox"
            name="categories"
            value="Technology"
            id="Technology"
          />
          &nbsp;
          <label for="Finance">Finance</label>
          <input
            type="checkbox"
            name="categories"
            value="Finance"
            id="Finance"
          />
          &nbsp;
          <label for="Marketing">Marketing</label>
          <input
            type="checkbox"
            name="categories"
            value="Marketing"
            id="Marketing"
          />
          &nbsp;
          <label for="Film">Film</label>
          <input type="checkbox" name="categories" value="Film" id="Film" />
          &nbsp;
        </fieldset>
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
