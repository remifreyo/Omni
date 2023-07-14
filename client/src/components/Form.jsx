import { useState, useEffect } from 'react'
import FileBase from 'react-file-base64'
import { useDispatch } from 'react-redux'
import { createArticle } from '../actions/articles'

const Form = () => {
  const [articleData, setarticleData] = useState({
    title: '',
    description: '',
    image: ''
  })
  const dispatch = useDispatch()
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(createArticle(articleData))
  }
  const handleChange = (e) => {
    setarticleData({ ...articleData, [e.target.id]: e.target.value })
  }
  useEffect(() => {}, [articleData])
  return (
    <div className="form">
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
