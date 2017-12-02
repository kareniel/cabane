var fs = require('fs')
var mkdirp = require('mkdirp')
var path = require('path')
var browserify = require('browserify')

module.exports = function (entry, done) {
  var src = path.join(entry, 'src/index.js')
  var dest = path.join(entry, 'dist/bundle.js')

  mkdirp.sync(path.dirname(dest))

  var b = browserify(src)

  b.bundle()
    .pipe(fs.createWriteStream(dest))
}
