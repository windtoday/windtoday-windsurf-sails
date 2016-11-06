'use strict'

const strmatch = require('str-match')
const find = require('lodash.find')
const regex = require('./regex')

function findBrand (brands, str, opts) {
  let brandData
  const brand = find(brands, function (item) {
    const pattern = item.brand.regex
    const re = regex(pattern, opts)
    brandData = strmatch(str, re)
    return brandData.test
  })

  if (brand) return {brand, brandData}
  return {brand: null, brandData: null}
}

module.exports = findBrand
