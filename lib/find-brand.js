'use strict'

const regexWordBoundary = require('regex-word-boundary')
const strmatch = require('str-match')()
const find = require('lodash.find')

function findBrand (brands, str, opts) {
  let matcher
  const data = find(brands, function (item) {
    const pattern = item.brand.regex
    const regex = regexWordBoundary(pattern, opts)
    matcher = strmatch(str, regex)
    return matcher.test
  })

  if (data) return {data, matcher}
  return {data: null, matcher: null}
}

module.exports = findBrand
