'use strict'

const directory = require('req-all')('./lib/dir')
const findBrand = require('./lib/find-brand')
const findModel = require('./lib/find-model')
const get = require('lodash.get')

function dir (str, opts) {
  const data = {}
  const brand = findBrand(directory, str, opts)
  if (!brand.data) return {data, output: str}

  data.brand = get(brand.data, 'brand.name')

  const models = get(brand.data, 'models')
  str = brand.matcher.output

  const model = findModel(models, str, opts)

  if (!model.data) return {data, output: brand.matcher.output}
  data.model = get(model.data, 'name')

  return {data, output: model.matcher.output}
}

module.exports = dir
