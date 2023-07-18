const jwt = require('jsonwebtoken')

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]

    if (token) {
      let data
      data = jwt.verify(token, 'test')
      req.userId = data?.id
      next()
    }
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  auth
}
