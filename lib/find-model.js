'use strict'

const strmatch = require('str-match')
const find = require('lodash.find')
const regex = require('./regex')

function findModel (models, str, opts) {
  let modelData

  const model = find(models, function (model) {
    const pattern = model.regex
    const re = regex(pattern, opts)
    modelData = strmatch(str, re)
    return modelData.test
  })

  if (model) return {model, modelData}
  return {model: null, modelData: null}
}

module.exports = findModel
