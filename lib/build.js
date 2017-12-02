var path = require('path')
var buildHTML = require('./build-html')
var buildCSS = require('./build-css')
var buildJS = require('./build-js')
var parallel = require('run-parallel')

module.exports = build

function build (entry, done = noop) {
  var { version } = require(path.join(entry, 'package.json'))
  
  parallel([
    done => buildHTML(entry, done),
    done => buildCSS(entry, done),
    done => buildJS(entry, done)
  ], onDone)

  function onDone (err) {
    if (err) {
      console.log('\u0007')
      console.error(err)
      return done(err)
    }
    console.log(`Successfully built version ${version}.`)
    done()
  }
}

function noop () {}