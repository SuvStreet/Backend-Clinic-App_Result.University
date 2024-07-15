require('dotenv').config()

const express = require('express')
const chalk = require('chalk')
const cors = require('cors')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const auth = require('./middlewares/auth')

const { createRecord, getRecords } = require('./controllers/records.controller')
const { loginUser } = require('./controllers/user.controller')
const mapRecord = require('./helpers/mapRecord')

const port = 3000

const app = express()

app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:5173',
  })
)
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))

app.post('/', async (req, res) => {
  try {
    const { name, phone, message, date } = req.body
    const newRecord = await createRecord({ name, phone, message, date })

    res.send({
      data: mapRecord(newRecord),
      error: null,
    })
  } catch (error) {
    res.send({
      data: null,
      error: error.errors ? error.errors.phone.message : error.message,
    })
  }
})

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    const token = await loginUser(email, password)

    res
      .cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
      })
      .send({
        data: {
          user: email,
          message: 'Авторизация прошла успешно!',
        },
        error: null,
      })
  } catch (error) {
    console.error('error:', error.message)
    res.send({
      data: null,
      error: error.message,
    })
  }
})

app.get('/records', auth, async (req, res) => {
  try {
    const { records, lastPage } = await getRecords(
      req.query.search,
      req.query.limit,
      req.query.page,
      req.query.sort
    )

    res.send({ data: records.map(mapRecord), lastPage, error: null })
  } catch (error) {
    console.error('error:', error.message)
    res.send({ data: null, error: error.message })
  }
})

app.post('/logout', auth, (req, res) => {
  res.clearCookie('token').send({ data: null, error: null })
})

mongoose.connect(process.env.MONGODB_CONNECTION_STRING).then(() => {
  app.listen(port, () => {
    console.log(chalk.green(`Server is running on port ${port}...`))
  })
})
