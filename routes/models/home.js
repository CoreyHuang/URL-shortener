const express = require('express')
const router = express.Router() 

const urlShortener = require('../../models/urlShortener.js')

router.get('/', (req, res) => {
  res.render('index')
})

router.post('/', (req, res) => {
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

module.exports = router


// function ///////////////////////////////////////////////////////////////

function getRandomString(dbData) {
  const upWord = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('')
  const downWord = upWord.map(data => data.toLowerCase())
  const number = "0123456789".split('')
  const mix = upWord.concat(downWord).concat(number)
  let randomWord = ""
  const returnURL = require('../../config/judgeURL.js')

  for (let i = 0; i < 5; i++)
    randomWord += mix[Math.floor(Math.random() * mix.length)]
  randomWord = returnURL + "/" + randomWord
  console.log("getRandomString()", randomWord)
  //預防隨機產生的短網址有重複
  if (dbData.find(data => data.shortenerURL === randomWord))
    return getRandomString(dbData)
  else
    return randomWord
}