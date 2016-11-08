'use strict'

const strmatch = require('str-match')
const find = require('lodash.find')
const regex = require('./regex')

function findModel (models, str, opts) {
  let matcher
  const data = find(models, function (model) {
    const pattern = model.regex
    const re = regex(pattern, opts)
    matcher = strmatch(str, re)
    return matcher.test
  })

  if (data) return {data, matcher}
  return {data: null, matcher: null}
}

module.exports = findModel
