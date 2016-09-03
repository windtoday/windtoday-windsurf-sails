'use strict'

var sortKeys = require('sort-keys')
var isEqual = require('json-is-equal')
var format = require('util').format
var lodash = require('lodash')
var files = require('..')

lodash.forEach(files, function (file, filename) {
  var sortedFile = sortKeys(file, {deep: true})
  sortedFile.models = lodash.sortBy(sortedFile.models, 'name')

  if (!isEqual(file, sortedFile)) {
    var message = format("File '%s' is not sorted", filename)
    throw new Error(message)
  }
})
