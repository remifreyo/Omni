const express = require('express')
const router = express.Router()
const articlesCtrl = require('../controllers/articles')

router.get('/', articlesCtrl.getArticles)

router.post('/', articlesCtrl.createArticle)

router.put('/:id', articlesCtrl.editArticle)

module.exports = router
