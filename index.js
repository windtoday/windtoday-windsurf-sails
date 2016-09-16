'use strict'

var directory = require('req-all')('lib')
var find = require('lodash.find')
var get = require('lodash.get')

function noop () {}

function noopExport () {
  return {
    brand: noop,
    model: noop
  }
}

function regex (pattern, str, opts) {
  opts = opts || 'i'
  return RegExp(pattern, opts).test(str)
}

function dir (str, opts) {
  var data = find(directory, function (item) {
    var pattern = item.brand.regex
    return regex(pattern, str, opts)
  })

  if (!data) return noopExport()

  function brand () {
    return get(data, 'brand.name')
  }

  function model () {
    var models = get(data, 'models')

    models = find(models, function (model) {
      return regex(model.regex, str, opts)
    })

    return get(models, 'name')
  }

  return {
    brand: brand,
    model: model
  }
}

module.exports = dir
