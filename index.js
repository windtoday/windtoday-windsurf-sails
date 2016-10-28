'use strict'

var directory = require('req-all')('lib')
var find = require('lodash.find')
var get = require('lodash.get')

function regex (pattern, str, opts) {
  opts = opts || 'i'
  return RegExp(pattern, opts).test(str)
}

function findBrand (brands, str, opts) {
  return find(brands, function (item) {
    var pattern = item.brand.regex
    return regex(pattern, str, opts)
  })
}

function findModel (models, str, opts) {
  return find(models, function (model) {
    var pattern = model.regex
    return regex(pattern, str, opts)
  })
}

function dir (str, opts) {
  var result = {}

  var brand = findBrand(directory, str, opts)

  if (!brand) return result
  result.brand = get(brand, 'brand.name')

  var models = get(brand, 'models')
  var model = findModel(models, str, opts)

  if (!model) return result
  result.model = get(model, 'name')

  return result
}

module.exports = dir
