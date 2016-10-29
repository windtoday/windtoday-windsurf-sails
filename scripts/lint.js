'use strict'

var files = require('req-all')('../lib')
var isEqual = require('json-is-equal')
var sortKeys = require('sort-keys')
var format = require('util').format
var lodash = require('lodash')

lodash.forEach(files, function (file, filename) {
  var sortedFile = sortKeys(file, {deep: true})
  sortedFile.models = lodash.sortBy(sortedFile.models, 'name')

  if (!isEqual(file, sortedFile)) {
    var message = format("File '%s' is not sorted", filename)
    console.log(sortedFile)
    throw new Error(message)
  }
})
