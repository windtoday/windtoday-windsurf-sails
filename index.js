'use strict'

var directory = require('req-all')('lib')
var find = require('lodash.find')
var get = require('lodash.get')

function regex (pattern, str, opts) {
  opts = opts || 'i'
  return RegExp(pattern, opts).test(str)
}

function dir (str, opts) {
  var brand = find(directory, function (item) {
    var pattern = item.brand.regex
    return regex(pattern, str, opts)
  })

  if (!brand) return {}

  var brandName = get(brand, 'brand.name')
  var models = get(brand, 'models')
  var model = find(models, function (model) {
    var pattern = model.regex
    return regex(pattern, str, opts)
  })
  var modelName = get(model, 'name')

  return {
    brand: brandName,
    model: modelName
  }
}

module.exports = dir
