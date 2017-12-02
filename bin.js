#! /usr/bin/env node

var minimist = require('minimist')
var ansi = require('ansi-escape-sequences')

process.title = 'cabane'

var USAGE = `
  $ ${clr('cabane', 'bold')} ${clr('<command>', 'green')} [options]
  Commands:
    build       compile all files to ${clr('dist/', 'green')}
    watch       start a development server
  Options:
    -h, --help        print usage
    -v, --version     print version
`.replace(/\n$/, '').replace(/^\n/, '')

var NOCOMMAND = `
  Please specify a cabane command:
    ${clr('$ cabane', 'cyan')} ${clr('<command>', 'green')}
    
  Run ${clr('cabane --help', 'cyan')} to see all options.
`.replace(/\n$/, '').replace(/^\n/, '')
var argv = minimist(process.argv.slice(2), {
  alias: {
    help: 'h',
    quiet: 'q',
    version: 'v'
  },
  boolean: [
    'help',
    'quiet',
    'version'
  ]
})

;(function main (argv) {
  var cmd = argv._[0]
  var entry = process.cwd()

  if (argv.help) {
    console.log(USAGE)
  } else if (argv.version) {
    console.log(require('./package.json').version)
  } else if (cmd === 'build') {
    require('./lib/build')(entry)
  } else if (cmd === 'watch') {
    require('./lib/watch')(entry)
  } else {
    console.log(NOCOMMAND)
    process.exit(1)
  }
})(argv)

function clr (text, color) {
  return process.stdout.isTTY ? ansi.format(text, color) : text
}

