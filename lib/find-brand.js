'use strict'

const strmatch = require('str-match')()
const find = require('lodash.find')
const regex = require('./regex')

function findBrand (brands, str, opts) {
  let matcher
  const data = find(brands, function (item) {
    const pattern = item.brand.regex
    const re = regex(pattern, opts)
    matcher = strmatch(str, re)
    return matcher.test
  })

  if (data) return {data, matcher}
  return {data: null, matcher: null}
}

module.exports = findBrand
