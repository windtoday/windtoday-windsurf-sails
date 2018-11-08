'use strict'

const files = require('import-modules')('../lib/dir')

const {forEach, sortBy} = require('lodash')
const isEqual = require('json-is-equal')
const sortKeys = require('sort-keys')

const MODALITIES = [
  'Beginner',
  'Wave',
  'Freestyle',
  'Freeride',
  'Freerace',
  'Race'
]

forEach(files, function ({file, filename}) {
  var sortedFile = sortKeys(file, {deep: true})
  sortedFile.models = sortBy(sortedFile.models, 'name')

  const isValidType = sortedFile.models.every(({type}) => (
    MODALITIES.includes(type)
  ))

  if (!isValidType) {
    throw new Error(`File '${filename}' contain an invalid 'type'`)
  }

  if (!isEqual(file, sortedFile)) {
    throw new Error(`File '${filename}' is not sorted`)
  }
})
