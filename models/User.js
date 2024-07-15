const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (email) {
        return validator.isEmail(email)
      },
      message: 'Некорректная почта',
    },
  },
  password: {
    type: String,
    required: true,
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User
