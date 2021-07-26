const express = require('express')
const app = express()
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/short-url-generator', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
const exphbs = require('express-handlebars');
const Url = require("./models/url")
const generateUrlWord = require("./generate_short-url")
const mainUrl = process.env.MAIN_URL || 'http://localhost:3000/'

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

app.post('/', async (req, res) => {
    const dbData = await Url.find().lean()
    const originalUrl = req.body.url
    let shortUrl
    Url.findOne({ originalUrl })
        .lean()
        .then(urls => {
            if (!urls) {
                let judgement = false
                do {
                    shortUrl = mainUrl + generateUrlWord()
                    for (let i = 0; i < dbData.length; i++) {
                        if (shortUrl === dbData[i].shortUrl) {
                            judgement = true
                            break
                        }
                    }
                } while (judgement)
                const url = new Url({ originalUrl, shortUrl })
                return url.save()
            } else {
                shortUrl = urls.shortUrl
            }
        })
        .then(() => res.render('index', { shortUrl }))
})

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