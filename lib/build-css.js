var fs = require('fs')
var mkdirp = require('mkdirp')
var path = require('path')
var postcss = require('postcss')
var precss = require('precss')
var autoprefixer = require('autoprefixer')
var sugarss = require('sugarss')
var nested = require('postcss-nested-props')
var utils = require('postcss-utilities')

var plugins = [ nested, precss, utils, autoprefixer ]

module.exports = function (entry, done) {
  var dist = path.join(entry, 'dist')
  mkdirp.sync(dist)
  var src = path.join(entry, 'src/style.sss')
  var dest = path.join(dist, 'style.css')

  fs.readFile(src, (err, css) => {
    postcss(plugins)
        .process(css, { parser: sugarss, from: src, to: dest })
        .then(result => {
            fs.writeFileSync(dest, result.css)
            if ( result.map ) fs.writeFileSync(dest + '.map', result.map)
            done()
            console.log('done!')
        })
        .catch(err => {
          done(err)
        })
  })
}
