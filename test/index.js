'use strict'

var directory = require('..')
require('should')

describe('directory', function () {
  it('nothing to detect', function () {
    const { sail, output } = directory('')
    sail.should.be.eql({})
  })

  it('only detect brand', function () {
    const { sail, output } = directory('ezzy')
    sail.should.be.eql({
      brand: 'Ezzy'
    })
  })

  it('detect brand and model', function () {
    const {sail, output} = directory('vendo vela ezzy panther')

    sail.should.be.eql({
      brand: 'Ezzy',
      model: 'Panther'
    })

    output.should.be.eql('vendo vela  ')
  })
})
