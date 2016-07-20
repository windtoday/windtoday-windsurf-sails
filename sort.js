'use strict'

var jsonFuture = require('json-future')
var sortKeys = require('sort-keys-recursive')
var lodash = require('lodash')
var path = require('path')
var files = require('.')

lodash.forEach(files, function (file, filename) {
  var sorted = sortKeys(file)
  sorted.models = lodash.sortBy(sorted.models, 'name')
  var filepath = path.resolve('lib', filename + '.json')
  jsonFuture.save(filepath, sorted)
})
