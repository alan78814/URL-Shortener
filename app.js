const express = require('express')
const app = express()
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/short-url-generator', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection


db.on('error', () => {
    console.log('mongodb error!')
})
db.once('open', () => {
    console.log('mongodb connected!')
})