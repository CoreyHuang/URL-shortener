const mongoose = require('mongoose')
const urlShortener = require('../urlShortener.js')
mongoose.connect('mongodb://localhost/urlShortener', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', () => { console.log('mongodb error!!!') })

db.once('open', () => {
  console.log('mongodb connected~')
  urlShortener.create({
    userURL: "test URL"
  })
})


