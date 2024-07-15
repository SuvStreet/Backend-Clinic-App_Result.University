const mongoose = require('mongoose')
const validator = require('validator')

const recordSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    validate: {
      validator: function (phone) {
        return validator.isMobilePhone(phone, 'ru-RU')
      },
      message: (props) => `Номер указан некорректно: ${props.value}`,
    },
  },
  message: {
    type: String,
    required: true,
  },
})

const Record = mongoose.model('Record', recordSchema)

module.exports = Record
