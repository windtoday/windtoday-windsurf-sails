'use strict'

const directory = require('..')
const should = require('should')

describe('directory', function () {
  it('under non detection, output is the string input', function () {
    const result = directory('foo')
    should(result).be.eql({
      data: {},
      output: 'foo'
    })
  })

  it('only detect brand', function () {
    const result = directory('ezzy')
    should(result).be.eql({
      data: { brand: 'Ezzy' },
      output: ''
    })
  })

  it('detect brand and model', function () {
    should(directory('vendo vela ezzy panther')).be.eql({
      data: { brand: 'Ezzy', model: 'Panther', modality: 'Wave' },
      output: 'vendo vela  '
    })
  })

  it.only('case sensitive', function () {
    should(directory('Ezzy Lion3')).be.eql({
      data: { brand: 'Ezzy', model: 'Lion', modality: 'Freerace' },
      output: ' '
    })
  })

  it('find similar items', function () {
    const item = {
      brand: 'Loft',
      model: 'Switch Blade'
    }

    const similarItems = directory.findSimilar(item)
    should(similarItems.length > 0).be.true()
  })
})
