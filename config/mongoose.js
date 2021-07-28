const mongoose = require('mongoose')
const mainUrl = process.env.mainUrl || 'http://localhost:3000/'
mongoose.connect(mainUrl, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
})

module.exports = db
