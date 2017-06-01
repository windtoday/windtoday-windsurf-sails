'use strict'

const regexWordBoundary = require('regex-word-boundary')
const find = require('lodash.find')

function createFinModel (strmatch) {
  function findModel (models, str) {
    let matcher
    const data = find(models, function (model) {
      const pattern = model.regex
      const regex = regexWordBoundary(pattern)
      matcher = strmatch(str, regex)
      return matcher.test
    })

    if (data) return {data, matcher}
    return {data: null, matcher: null}
  }

  return findModel
}

module.exports = createFinModel
