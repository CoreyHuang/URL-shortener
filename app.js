const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const routes = require('./routes/index.js')
require('./config/mongoose.js')

const post = process.env.PORT || 3000
const app = express()
app.engine('handlebars', exphbs({ defaultLayout: "main" }))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(routes)

app.listen(post, () => {
  console.log('Server is enable...')
})




















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