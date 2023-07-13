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
  console.log(article)
  const newArticle = new Article(article)
  try {
    await newArticle.save()
    res.status(201).json(newArticle)
  } catch (error) {
    console.log(error.message)
  }
}

module.exports = {
  createArticle,
  getArticles
}
