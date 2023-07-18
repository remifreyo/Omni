const express = require('express')
const router = express.Router()
const articlesCtrl = require('../controllers/articles')
const auth = require('../middleware/auth')

router.get('/', articlesCtrl.getArticles)

router.post('/', articlesCtrl.createArticle)

router.put('/:id', articlesCtrl.editArticle)

router.delete('/:id', articlesCtrl.deleteArticle)

module.exports = router
