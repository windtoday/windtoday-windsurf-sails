'use strict'

const regexWordBoundary = require('regex-word-boundary')
const find = require('lodash.find')

function createFinBrand (strmatch) {
  function findBrand (brands, str) {
    let matcher
    const data = find(brands, function (item) {
      const pattern = item.brand.regex
      const regex = regexWordBoundary(pattern)
      matcher = strmatch(str, regex)
      return matcher.test
    })

    if (data) return {data, matcher}
    return {data: null, matcher: null}
  }

  return findBrand
}

module.exports = createFinBrand
