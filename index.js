'use strict'

const createStrmatch = require('str-match')
const get = require('lodash.get')

const createFinBrand = require('./lib/find-brand')
const createFinModel = require('./lib/find-model')
const dir = require('req-all')('./lib/dir')

const DEFAULT_OPTS = {
  findModel: true
}

const getOpts = opts => Object.assign({}, DEFAULT_OPTS, opts)

function directory (str, opts) {
  const {findModel: hasFindModel, strmatchOpts} = getOpts(opts)
  const strmatch = createStrmatch(strmatchOpts)
  const findBrand = createFinBrand(strmatch)
  const findModel = hasFindModel && createFinModel(strmatch)

  const data = {}

  const brand = findBrand(dir, str)
  if (!brand.data) return {data, output: str}

  data.brand = get(brand.data, 'brand.name')

  if (!findModel) {
    return {data, output: brand.matcher.output}
  }

  const models = get(brand.data, 'models')
  str = brand.matcher.output

  const model = findModel(models, str, opts)

  if (!model.data) return {data, output: brand.matcher.output}
  data.model = get(model.data, 'name')

  return {data, output: model.matcher.output}
}

module.exports = directory
