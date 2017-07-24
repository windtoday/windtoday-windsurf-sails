'use strict'

const reduce = require('lodash.reduce')
const filter = require('lodash.filter')
const find = require('lodash.find')
const map = require('lodash.map')

const isSameBrand = brand => item => brand === item.brand.name
const isSameModel = model => item => model === item.name

const getAllModels = brands => reduce(brands, (acc, {brand, models}) => {
  const {name: brandName} = brand
  const brandModels = map(models, ({name: model, type}) => (
    {brand: brandName, model, type}
  ))
  return acc.concat(brandModels)
}, [])

module.exports = brands => {
  const allModels = getAllModels(brands)
  return ({brand, model}) => {
    const {models} = find(brands, isSameBrand(brand))
    const {type} = find(models, isSameModel(model))
    return filter(allModels, item => (
      item.model !== model &&
      item.type === type
    ))
  }
}
