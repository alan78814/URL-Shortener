const express = require('express')
const app = express()
const exphbs = require('express-handlebars');
const routes = require('./routes')

require('./config/mongoose')

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(routes)


app.listen(3000, () => {
    console.log('App is running on http://localhost:3000.')
})

