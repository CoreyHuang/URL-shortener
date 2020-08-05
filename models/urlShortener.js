const mongoose = require('mongoose')
const Schema = mongoose.Schema
const urlShortener = new Schema({
  userURL: {
    type: String,
    require: true,
  },
  shortenerURL: {
    type: String,
  }
})

module.exports = mongoose.model('urlShortener', urlShortener)
