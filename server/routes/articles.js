const express = require('express')
const router = express.Router()
const articlesCtrl = require('../controllers/articles')
const auth = require('../middleware/auth')

router.get('/:id', articlesCtrl.getArticle)

router.get('/', articlesCtrl.getArticles)

router.post('/', articlesCtrl.createArticle)

router.put('/:id', articlesCtrl.editArticle)

router.delete('/:id', articlesCtrl.deleteArticle)

router.post('/:id/commentArticle', articlesCtrl.commentArticle)

module.exports = router
