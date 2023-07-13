const express = require('express')
const router = express.Router()
const articlesCtrl = require('../controllers/articles')

router.get('/', articlesCtrl.getArticles)

router.post('/', articlesCtrl.createArticle)

module.exports = router
