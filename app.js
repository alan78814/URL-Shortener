const express = require('express')
const app = express()
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/short-url-generator', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
const exphbs = require('express-handlebars');

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('index')
})

app.listen(3000, () => {
    console.log('App is running on http://localhost:3000.')
  })

db.on('error', () => {
    console.log('mongodb error!')
})
db.once('open', () => {
    console.log('mongodb connected!')
})