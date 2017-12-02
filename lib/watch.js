var fs = require('fs')
var URL = require('url')
var path = require('path')
var budo = require('budo')
var mkdirp = require('mkdirp')
var slashes = require('connect-slashes')

var buildHTML = require('./build-html')
var buildCSS = require('./build-css')

module.exports = watch

function watch (entry) {
  mkdirp(path.join(__dirname, '../dist'))

  var b = budo('src/index.js:bundle.js', {
    dir: ['dist', 'assets'],
    port: 1111,
    live: true,
    ssl: true,
    stream: process.stdout,
    watchGlob: 'src/**/*.{pug,sss,js}',
    staticOptions: {
      extensions: [ 'html' ]
    }
  }).on('watch', (e, file) => {
    console.log('watch', e)
    switch(path.extname(file)) {
      case '.pug': {
        compileHTML(entry, onDone)
        return
      }
      case '.css': {
        compileCSS(entry, onDone)
        return
      }
      default:
        return
    }
  })

  buildHTML(entry, onDone)
  buildCSS(entry, onDone)

  function onDone (err) {
    if (err) {
      console.log('\u0007')
      console.log(err)
      return 
    }

    b.reload()
  }
}
