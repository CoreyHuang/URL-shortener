const db = require('../../config/mongoose.js')
const urlShortener = require('../urlShortener.js')

db.once('open', () => {
  urlShortener.create({
    userURL: "test URL"
  })
  .then(() => db.close())
  .catch(error => console.log(error))
})


