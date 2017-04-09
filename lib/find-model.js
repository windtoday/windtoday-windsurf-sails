'use strict'

const regexWordBoundary = require('regex-word-boundary')
const strmatch = require('str-match')()
const find = require('lodash.find')

function findModel (models, str, opts) {
  let matcher
  const data = find(models, function (model) {
    const pattern = model.regex
    const regex = regexWordBoundary(pattern, opts)
    matcher = strmatch(str, regex)
    return matcher.test
  })

  if (data) return {data, matcher}
  return {data: null, matcher: null}
}

module.exports = findModel
