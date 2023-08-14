import { useState, useEffect } from 'react'
import FileBase from 'react-file-base64'
import { useDispatch, useSelector } from 'react-redux'
import { createArticle, updateArticle } from '../actions/articles'
import { useLocation, useNavigate } from 'react-router-dom'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { Button, Input } from '@material-tailwind/react'

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, false] }, { font: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' }
    ],
    ['link', 'image', 'video'],
    ['clean']
  ]
}

const formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'video'
]

const Form = () => {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('profile'))
  const [articleData, setarticleData] = useState({
    title: '',
    description: '',
    image: '',
    categories: []
  })
  const [categories, setCategories] = useState([])
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
    if (e.target.checked === true && e.target.name === 'categories') {
      let cat = [...categories, e.target.value]
      setCategories([...categories, e.target.value])
      setarticleData({ ...articleData, ['categories']: cat })
    } else if (e.target.checked === false && e.target.name === 'categories') {
      let cat = categories.filter((category) => category !== e.target.value)
      setCategories(
        categories.filter((category) => category !== e.target.value)
      )
      setarticleData({ ...articleData, ['categories']: cat })
    } else {
      setarticleData({ ...articleData, [e.target.id]: e.target.value })
    }
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
    <div className="form bg-gray-100 p-12 shadow-xl">
      <h2 className="text-gray-800 text-center">
        {location.pathname != '/new' ? 'Edit Article' : 'Create Article'}
      </h2>
      <br />
      <form onSubmit={handleSubmit}>
        <Input
          id="title"
          type="text"
          placeholder="Title"
          onFocus={(e) => (e.target.placeholder = '')}
          onBlur={(e) => (e.target.placeholder = 'Title')}
          value={articleData.title}
          onChange={handleChange}
        />
        <br />
        <fieldset>
          <legend className="mb-8 text-gray-700">
            Select one or more Categories:
          </legend>
          <label htmlFor="Music">Music</label>
          <input
            type="checkbox"
            name="categories"
            value="Music"
            id="categories"
            onChange={handleChange}
          />
          &nbsp;
          <label htmlFor="Technology">Technology</label>
          <input
            type="checkbox"
            name="categories"
            value="Technology"
            id="categories"
            onChange={handleChange}
          />
          &nbsp;
          <label htmlFor="Finance">Finance</label>
          <input
            type="checkbox"
            name="categories"
            value="Finance"
            id="categories"
            onChange={handleChange}
          />
          &nbsp;
          <label htmlFor="Marketing">Marketing</label>
          <input
            type="checkbox"
            name="categories"
            value="Marketing"
            id="categories"
            onChange={handleChange}
          />
          &nbsp;
          <label htmlFor="Film">Film</label>
          <input
            type="checkbox"
            name="categories"
            value="Film"
            id="categories"
            onChange={handleChange}
          />
          &nbsp;
        </fieldset>
        <br />
        {/* <textarea
          id="description"
          cols="50"
          rows="10"
          onChange={handleChange}
          value={articleData.description}
        ></textarea> */}
        <ReactQuill
          id="description"
          onChange={(newValue) =>
            setarticleData({ ...articleData, description: newValue })
          }
          value={articleData.description}
          className="editor"
          modules={modules}
          formats={formats}
        />
        <br />
        <p>Choose An Image:</p>
        <FileBase
          multiple={false}
          type="file"
          onDone={({ base64 }) =>
            setarticleData({ ...articleData, image: base64 })
          }
        />
        <div className="text-center">
          <Button className="w-1/3" type="submit">
            Submit!
          </Button>
        </div>
      </form>
    </div>
  )
}

export default Form
