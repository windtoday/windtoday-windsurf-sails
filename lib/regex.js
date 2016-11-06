'use strict'

function regex (pattern, opts) {
  opts = opts || 'i'
  return RegExp(pattern, opts)
}

module.exports = regex
