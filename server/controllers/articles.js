const { default: mongoose } = require('mongoose')
const Article = require('../models/article')

const getArticles = async (req, res) => {
  try {
    const allArticles = await Article.find()
    res.status(200).json(allArticles)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

const createArticle = async (req, res) => {
  const article = req.body
  const newArticle = new Article(article)
  try {
    await newArticle.save()
    res.status(201).json(newArticle)
  } catch (error) {
    console.log(error.message)
  }
}

const editArticle = async (req, res) => {
  const { id: _id } = req.params
  const article = req.body
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

module.exports = {
  createArticle,
  getArticles,
  editArticle,
  deleteArticle
}
