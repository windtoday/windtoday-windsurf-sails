'use strict'

var files = require('req-all')('../lib')
var jsonFuture = require('json-future')
var sortKeys = require('sort-keys')
var lodash = require('lodash')
var path = require('path')

lodash.forEach(files, function (file, filename) {
  var sortedFile = sortKeys(file, {deep: true})
  sortedFile.models = lodash.sortBy(sortedFile.models, 'name')

  var filepath = path.resolve('lib', filename + '.json')
  jsonFuture.save(filepath, sortedFile)
})
