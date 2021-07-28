const express = require('express')
const app = express()
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/short-url-generator', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
const exphbs = require('express-handlebars');
const routes = require('./routes')

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(routes)


app.listen(3000, () => {
    console.log('App is running on http://localhost:3000.')
})

db.on('error', () => {
    console.log('mongodb error!')
})
db.once('open', () => {
    console.log('mongodb connected!')
})