const chalk = require('chalk')
const Record = require('../models/Record')

async function createRecord(recordData) {
  const { name, phone, message, date } = recordData

  const createdRecord = await Record.create({ name, phone, message, date })

  console.log(chalk.bgGreen('Запись успешна создана!'))

  return createdRecord
}

async function getRecords(search = '', limit = 10, page = 1, sort = 'desc-date') {
  let sortMap = sort.split('-')

  const [records, count] = await Promise.all([
    Record.find({ name: { $regex: search, $options: 'i' } })
      .limit(limit)
      .skip(limit * (page - 1))
      .sort({ [sortMap[1]]: sortMap[0] }),
    Record.countDocuments({ name: { $regex: search, $options: 'i' } }),
  ])

  return { records, lastPage: Math.ceil(count / limit) }
}

module.exports = {
  createRecord,
  getRecords,
}
