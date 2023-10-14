import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { Button, Input } from '@material-tailwind/react'
import FileBase from 'react-file-base64'
import { createArticle, updateArticle } from '../actions/articles'

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
  const location = useLocation()
  const dispatch = useDispatch()
  const user = JSON.parse(localStorage.getItem('profile'))

  const initialArticleData = {
    title: '',
    description: '',
    image: '',
    categories: []
  }

  const [articleData, setArticleData] = useState(initialArticleData)
  const [categories, setCategories] = useState([])
  const articles = useSelector((state) => state.articles)

  useEffect(() => {
    if (location.pathname !== '/new' && articleData.description === '') {
      const currentArticle = articles.find(
        (article) => article._id === location.pathname.slice(1, 25)
      )
      if (currentArticle) {
        setArticleData(currentArticle)
        setCategories(currentArticle.categories)
      }
    }
  }, [articleData, articles])

  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target
    if (name === 'categories') {
      const updatedCategories = checked
        ? [...categories, value]
        : categories.filter((category) => category !== value)
      setCategories(updatedCategories)
      setArticleData({ ...articleData, categories: updatedCategories })
    }
  }

  const handleInputChange = (e) => {
    const { id, value } = e.target
    setArticleData({ ...articleData, [id]: value })
  }

  const handleDescriptionChange = (newValue) => {
    setArticleData({ ...articleData, description: newValue })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const authorName = user?.result?.name

    if (location.pathname === '/new') {
      dispatch(createArticle({ ...articleData, author: authorName }))
      navigate('/')
    } else {
      dispatch(
        updateArticle(location.pathname.slice(1, 25), {
          ...articleData,
          author: authorName
        })
      )
      navigate(`/${location.pathname.slice(1, 25)}`)
    }
  }

  return (
    <div className="form bg-gray-100 p-12 shadow-xl">
      <h2 className="text-gray-800 text-center">
        {location.pathname !== '/new' ? 'Edit Article' : 'Create Article'}
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
          onChange={handleInputChange}
        />
        <br />
        <fieldset>
          <legend className="mb-8 text-gray-700">
            Select one or more Categories:
          </legend>
          <div className="flex flex-wrap">
            {['Music', 'Technology', 'Finance', 'Marketing', 'Film'].map(
              (category) => (
                <div key={category} className="flex items-center mr-4">
                  <input
                    type="checkbox"
                    name="categories"
                    value={category}
                    id="categories"
                    checked={categories.includes(category)}
                    onChange={handleCheckboxChange}
                    className="mr-2 accent-primary formCheckbox"
                  />
                  <label htmlFor={category}>{category}</label>
                </div>
              )
            )}
          </div>
        </fieldset>
        <br />
        <ReactQuill
          id="description"
          onChange={handleDescriptionChange}
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
            setArticleData({ ...articleData, image: base64 })
          }
        />
        <div className="text-center">
          <Button className="w-2/5 sm:w-1/3" type="submit">
            Submit!
          </Button>
        </div>
      </form>
    </div>
  )
}

export default Form
