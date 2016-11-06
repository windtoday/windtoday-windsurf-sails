'use strict'

const directory = require('req-all')('./lib/dir')
const findBrand = require('./lib/find-brand')
const findModel = require('./lib/find-model')
const get = require('lodash.get')

function dir (str, opts) {
  const sail = {}
  const {brand, brandData} = findBrand(directory, str, opts)

  if (!brand) return {sail}
  sail.brand = get(brand, 'brand.name')

  const models = get(brand, 'models')
  const {model, modelData} = findModel(models, brandData.output, opts)

  if (!model) return {sail, output: brandData.output}
  sail.model = get(model, 'name')

  return {sail, output: modelData.output}
}

module.exports = dir
