const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/urlShortener', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => { console.log('mongodb error!!!') })
db.once('open', () => { console.log('mongodb connected~') })



const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const post = 3000
const bodyParser = require('body-parser')
const urlShortener = require('./models/urlShortener.js')



app.engine('handlebars', exphbs({ defaultLayout: "main" }))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/', (req, res) => {
  // console.log(req.body)
  let resURL = ""
  urlShortener.find()
    .then(dbData => {
      let findData = dbData.find(data => data.userURL === req.body.userURL)
      // console.log("findData", findData)
      if (!findData) {
        resURL = getRandomString(dbData)
        // console.log("resURL", resURL)
        urlShortener.create({ userURL: req.body.userURL, shortenerURL: resURL })
      }
      else {
        resURL = findData.shortenerURL
        // console.log("resURL", resURL)
      }
    })
    .then(() => { res.render('shortenURL', { resURL }) })
    .catch(error => console.log(error))
  // res.render('shortenURL', {})
})



app.listen(post, () => {
  console.log('Server is enable...')
})


function getRandomString(dbData) {
  const upWord = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('')
  const downWord = upWord.map(data => data.toLowerCase())
  const number = "0123456789".split('')
  const mix = upWord.concat(downWord).concat(number)
  let randomWord = ""

  for (let i = 0; i < 5; i++)
    randomWord += mix[Math.floor(Math.random() * mix.length)]
  randomWord = "http://localhost:3000/" + randomWord

  if (dbData.find(data => data.shortenerURL === randomWord))
    return getRandomString(dbData)
  else
    return randomWord
}

