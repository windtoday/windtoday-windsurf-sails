'use strict'

function regex (pattern, opts) {
  opts = opts || 'i'
  return RegExp(`\b${pattern}\b`, opts)
}

module.exports = regex
