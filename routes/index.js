const express = require('express')
const router = express.Router()
const Url = require("../models/url")
const generateUrlWord = require("../generate_short-url")
const mainUrl = process.env.MAIN_URL || 'http://localhost:3000/'

router.post('/', async (req, res) => {
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
        .then(() => res.render('index', { shortUrl: `<div class="mb-2 text-success">Success! please use this link:</div>` + shortUrl }))
})

router.get('/:shorturl', (req, res) => {
    const shortUrl = mainUrl + req.params.shorturl
    Url.findOne({ shortUrl })
        .lean()
        .then(url => {
            res.redirect(url.originalUrl)
        })
})

router.get('/', (req, res) => {
    res.render('index')
})

module.exports = router


