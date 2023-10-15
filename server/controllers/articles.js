const { default: mongoose } = require('mongoose')
const Article = require('../models/article')
const Category = require('../models/category')

const getArticles = async (req, res) => {
  try {
    const allArticles = await Article.find()
    res.status(200).json(allArticles)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

const getArticle = async (req, res) => {
  const { id: _id } = req.params
  try {
    const article = await Article.findById(_id)
    if (!article) {
      return res.status(404).json({ message: 'Article not found' })
    }
    res.status(200).json(article)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

const createArticle = async (req, res) => {
  const article = {
    title: req.body.title,
    description: req.body.description,
    image: req.body.image,
    author: req.body.author
  }
  const newArticle = new Article(article)
  try {
    await Promise.all(
      req.body.categories.map(async (cat) => {
        let c = await Category.find({ category: cat })
        let objId = JSON.stringify(c[0]._id)
        newArticle.categories.push(objId.split(`"`)[1])
      })
    )
    await newArticle.save()
    res.status(201).json(newArticle)
  } catch (error) {
    console.log(error.message)
  }
}

const editArticle = async (req, res) => {
  const { id: _id } = req.params
  const article = {
    title: req.body.title,
    description: req.body.description,
    image: req.body.image,
    author: req.body.author,
    categories: []
  }

  await Promise.all(
    req.body.categories.map(async (cat) => {
      let c = await Category.find({ category: cat })
      if (c.length !== 0) {
        let objId = JSON.stringify(c[0]._id)
        article.categories.push(objId.split(`"`)[1])
      }
    })
  )

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send('No post with that id')
  const updatedArticle = await Article.findByIdAndUpdate(
    _id,
    { ...article, _id },
    {
      new: true
    }
  )
  res.json(updatedArticle)
}

const deleteArticle = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send('No post with that id')

  await Article.findByIdAndRemove(id)
  res.json({ message: 'Post deleted successfully' })
}

const commentArticle = async (req, res) => {
  const { id } = req.params
  const { value } = req.body
  const article = await Article.findById(id)

  article.comments.push({
    comment: value
  })

  await article.save() // Save the article to update it with the new comment

  res.json(article.comments) // Return the updated comments array
}

module.exports = {
  createArticle,
  getArticles,
  getArticle,
  editArticle,
  deleteArticle,
  commentArticle
}
