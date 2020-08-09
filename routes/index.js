const express = require('express')
const router = express.Router() 
const urlShortener = require('../models/urlShortener.js')

const home = require('./models/home.js')

router.use((req, res, next) => {
  const returnURL = require('../config/judgeURL.js')
  urlShortener.find().lean()
    .then(dbData => {
      //傳來的網址中，如果資料庫有短網址，就直接導傳新網址
      const checkStatus = dbData.find(data => data.shortenerURL === (returnURL + req.url))
      if (checkStatus) res.redirect(checkStatus.userURL)
      else next()
    })
})

router.use('/', home)

module.exports = router


