const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../constants/constants')

module.exports = async function auth(req, res, next) {
  try {
    const token = req.cookies.token

    const verifyResult = jwt.verify(token, JWT_SECRET)

    req.user = {
      email: verifyResult.email,
    }

    next()
  } catch (error) {
    return res.send({
      data: null,
      error: 'Пользователь не авторизован!',
    })
  }
}
