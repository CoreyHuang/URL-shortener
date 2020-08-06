const mongoose = require('mongoose')
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/urlShortener'
const returnURL = process.env.MONGODB_URI ? "https://vast-retreat-37768.herokuapp.com" : "http://localhost:3000"
console.log("returnURL", returnURL)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => { console.log('mongodb error!!!') })
db.once('open', () => { console.log('mongodb connected~') })

const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const post = process.env.PORT || 3000
const bodyParser = require('body-parser')
const urlShortener = require('./models/urlShortener.js')

app.engine('handlebars', exphbs({ defaultLayout: "main" }))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended: true }))

app.use((req, res, next) => {
  urlShortener.find().lean()
    .then(dbData => {
      //傳來的網址中，如果資料庫有短網址，就直接導傳新網址
      const checkStatus = dbData.find(data => data.shortenerURL === (returnURL + req.url))
      if (checkStatus) res.redirect(checkStatus.userURL)
      else next()
    })
})

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/', (req, res) => {
  let resURL = ""
  urlShortener.find()
    .then(dbData => {
      //預防輸入的網址有重複
      let findData = dbData.find(data => data.userURL === req.body.userURL)
      if (!findData) {
        resURL = getRandomString(dbData)
        console.log("app.post", resURL)
        urlShortener.create({ userURL: req.body.userURL, shortenerURL: resURL })
      }
      else {
        resURL = findData.shortenerURL
      }
    })
    .then(() => { res.render('shortenURL', { resURL }) })
    .catch(error => console.log(error))
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
  randomWord = returnURL +"/" + randomWord
  console.log("getRandomString()", randomWord)
  //預防隨機產生的短網址有重複
  if (dbData.find(data => data.shortenerURL === randomWord))
    return getRandomString(dbData)
  else
    return randomWord
}


// for copy function ， only test
//===================================================================
// let jsdom = require('jsdom').JSDOM,

//   uri = './views/index.handlebars',
//   options = {
//     runScripts: 'dangerously',
//     resources: "usable"
//   };

// jsdom.fromFile(uri, options).then(function (dom) {
//   let window = dom.window,
//     document = window.document;
//   console.log(document.querySelectorAll('body')[0].innerHTML);
// }).catch(function (e) { console.log(e); });



// let jsdom = require('jsdom').JSDOM
  // uri = './views/index.handlebars',
  // options = {
  //   // url: "http://localhost:3000/",
  //   runScripts: 'dangerously',
  //   resources: "usable"
  // };

// const jsdom = require("jsdom");
// const { JSDOM } = jsdom;

//   let x
//   jsdom.fromFile(uri, options).then(function (dom) {
//   let window = dom.window,
//     document = window.document;
//   console.log(x = document.querySelector('body').innerHTML);
// }).catch(function (e) { console.log(e); });

  // const dom = new JSDOM(``, {
  //   url: "http://localhost:3000/",
  //   referrer: "http://localhost:3000/",
  //   contentType: "text/html",
  //   includeNodeLocations: true,
  //   storageQuota: 10000000
  // });
  // console.log("test", dom.window.document.querySelector('body').innerHTML)