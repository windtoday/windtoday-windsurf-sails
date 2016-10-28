'use strict'

var directory = require('..')
require('should')

describe('directory', function () {
  it('nothing to detect', function () {
    directory('').should.be.eql({})
  })

  it('only detect brand', function () {
    directory('ezzy').should.be.eql({
      brand: 'Ezzy'
    })
  })

  it('detect brand and model', function () {
    directory('ezzy panther').should.be.eql({
      brand: 'Ezzy',
      model: 'Panther'
    })
  })
})
