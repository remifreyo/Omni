import React, { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import {
  Button,
  Input,
  Checkbox,
  Card,
  List,
  ListItem,
  ListItemPrefix,
  Typography
} from '@material-tailwind/react'
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

const categoryMapping = {
  '64b7efe040d0677f80eb1d4e': 'Music',
  '64b7efe740d0677f80eb1d7e': 'Finance',
  '64b7efb540d0677f80eb1cbe': 'Technology',
  '64b7efee40d0677f80eb1dc5': 'Marketing',
  '64b7f575f4be0d3fb9bcbf84': 'Film'
}

const Form = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const user = JSON.parse(localStorage.getItem('profile'))
  const hiddenFileInput = useRef(null)

  const initialArticleData = {
    title: '',
    description: '',
    image: '',
    categories: []
  }

  const [articleData, setArticleData] = useState(initialArticleData)
  const articles = useSelector((state) => state.articles)
  const [categories, setCategories] = useState([]) // Maintaining categories state
  const [formErrors, setFormErrors] = useState('')

  useEffect(() => {
    if (location.pathname !== '/new' && articleData.description === '') {
      const currentArticle = articles.find(
        (article) => article._id === location.pathname.slice(1, 25)
      )
      if (currentArticle) {
        const categoryNames = currentArticle.categories.map(
          (categoryId) => categoryMapping[categoryId]
        )
        setCategories(categoryNames || [])
        // Update articleData with the title and image
        articleData.title = currentArticle.title // Prepopulate title
        articleData.image = currentArticle.image // Prepopulate image
        articleData.categories = categoryNames
        articleData.description = currentArticle.description
        setArticleData({ ...articleData })
      }
    }
  }, [articles, location.pathname])

  const validateForm = () => {
    let isValid = true
    const errors = {
      title: '',
      description: '',
      category: '',
      image: ''
    }

    if (articleData.title.length > 65) {
      isValid = false
      errors.title = 'Title must be 65 characters or less'
    }
    if (!articleData.title.trim()) {
      isValid = false
      errors.title = 'Title is required'
    }
    if (!articleData.description.trim()) {
      isValid = false
      errors.description = 'Description is required'
    }
    if (articleData.categories.length < 1) {
      isValid = false
      errors.category = 'Category is required'
    }
    if (!articleData.image.trim()) {
      isValid = false
      errors.image = 'Image is required'
    }

    setFormErrors(errors)

    return isValid
  }

  const handleFileSelected = (file) => {
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      image: ''
    }))
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const dataURL = e.target.result
        setArticleData({ ...articleData, image: dataURL })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCheckboxChange = (e) => {
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      category: ''
    }))
    const { name, value, checked } = e.target
    if (name === 'categories') {
      const updatedCategories = checked
        ? [...categories, value] // Use category IDs here
        : categories.filter((category) => category !== value)
      setCategories(updatedCategories)
      setArticleData({ ...articleData, categories: updatedCategories })
    }
  }

  const handleInputChange = (e) => {
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [id]: ''
    }))
    const { id, value } = e.target
    setArticleData({ ...articleData, [id]: value })
  }

  const handleDescriptionChange = (newValue) => {
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      description: ''
    }))
    setArticleData({ ...articleData, description: newValue })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const authorName = user?.result?.name
    if (validateForm()) {
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
  }

  const handleClick = () => {
    hiddenFileInput.current.click()
  }

  return (
    <div className="form bg-gray-100 p-12 shadow-xl">
      <h2 className="text-gray-800 text-center">
        {location.pathname !== '/new' ? 'Edit Article' : 'Create Article'}
      </h2>
      <br />
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <Input
          id="title"
          type="text"
          placeholder="Title"
          onFocus={(e) => (e.target.placeholder = '')}
          onBlur={(e) => (e.target.placeholder = 'Title')}
          value={articleData.title} // Prepopulate title
          onChange={handleInputChange}
        />
        {formErrors.title && (
          <div className="text-red-600">{formErrors.title}</div>
        )}
        <br />
        <fieldset>
          <legend className="mb-4 text-gray-700 text-center">
            Select one or more Categories:
          </legend>
          <Card className="bg-gray-100">
            <List className="flex-row">
              {['Music', 'Technology', 'Finance', 'Marketing', 'Film'].map(
                (categoryName) => (
                  <ListItem key={categoryName} className="p-0">
                    <label
                      htmlFor={`horizontal-list-${categoryName.toLowerCase()}`}
                      className="flex w-full cursor-pointer items-center px-3 py-2"
                    >
                      <ListItemPrefix className="mr-3">
                        <Checkbox
                          id={`horizontal-list-${categoryName.toLowerCase()}`}
                          ripple={false}
                          className="hover:before:opacity-0"
                          containerProps={{
                            className: 'p-0'
                          }}
                          checked={categories.includes(categoryName)}
                          onChange={handleCheckboxChange}
                          name="categories"
                          value={categoryName}
                        />
                      </ListItemPrefix>
                      <Typography
                        color="blue-gray"
                        className="mr-8 categoryName"
                      >
                        {categoryName}
                      </Typography>
                    </label>
                  </ListItem>
                )
              )}
            </List>
          </Card>
        </fieldset>
        {formErrors.category && (
          <div className="text-red-600">{formErrors.category}</div>
        )}
        <br />
        <ReactQuill
          id="description"
          onChange={handleDescriptionChange}
          value={articleData.description}
          className="editor mb-0 w-full"
          modules={modules}
          formats={formats}
        />
        {formErrors.description && (
          <div className="text-red-600">{formErrors.description}</div>
        )}
        <div className="w-1/2 flex flex-1 flex-wrap justify-center m-4">
          <p className="text-center mb-4">Choose An Image:</p>
          <div
            style={{
              display: 'inline-block',
              backgroundColor: '#5B3758',
              color: 'white',
              cursor: 'pointer',
              borderRadius: '4px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
              flex: '0 0 40%',
              margin: '0 auto', // Center the button horizontally
              textAlign: 'center',
              opacity: '85%',
              padding: '8px' // Adjust padding to control button size
            }}
            onClick={handleClick}
          >
            Select Image
          </div>
          <input
            type="file"
            onChange={(e) => handleFileSelected(e.target.files[0])}
            ref={hiddenFileInput}
            style={{ display: 'none', flex: '0 0 100%' }}
          />
          <img
            src={articleData.image}
            alt="No File Selected"
            className="w-full mt-4 mb-8 text-center"
          />
          {formErrors.image && (
            <div className="text-red-600">{formErrors.image}</div>
          )}
        </div>
        <div className="text-center w-80">
          <Button className="w-4/5" type="submit">
            Submit!
          </Button>
        </div>
      </form>
    </div>
  )
}

export default Form
