const express = require('express')
const router = express.Router()
const usersCtrl = require('../controllers/users')

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('respond with a resource')
})

router.post('/signin', usersCtrl.signin)
router.post('/signup', usersCtrl.signup)

module.exports = router
