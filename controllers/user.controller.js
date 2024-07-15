const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../constants/constants')

async function loginUser(email, password) {
  const user = await User.findOne({ email })

  if (!user) {
    throw new Error('Пользователь не найден!')
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password)

  if (!isPasswordCorrect) {
    throw new Error('Пароль неверный!')
  }

  return jwt.sign({ email }, JWT_SECRET, { expiresIn: '14d' })
}

module.exports = {
  loginUser
}