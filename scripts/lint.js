'use strict'

var files = require('req-all')('../lib/dir')
var isEqual = require('json-is-equal')
var sortKeys = require('sort-keys')
var lodash = require('lodash')

const TYPES = [
  'Beginner',
  'Wave',
  'Freestyle',
  'Freeride',
  'Freerace',
  'Race'
]

lodash.forEach(files, function ({file, filename}) {
  var sortedFile = sortKeys(file, {deep: true})
  sortedFile.models = lodash.sortBy(sortedFile.models, 'name')

  const isValidType = sortedFile.models.every(({type}) => (
    TYPES.includes(type)
  ))

  if (!isValidType) {
    throw new Error(`File '${filename}' contain an invalid 'type'`)
  }

  if (!isEqual(file, sortedFile)) {
    throw new Error(`File '${filename}' is not sorted`)
  }
})
