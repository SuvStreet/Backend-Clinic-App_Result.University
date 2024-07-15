module.exports = function (recordDb) {
  return {
    id: recordDb._id,
    name: recordDb.name,
    phone: recordDb.phone,
    message: recordDb.message,
    date: recordDb.date
  }
}