'use strict'

var directory = require('..')
require('should')

describe('directory', function () {
  describe('detection', function () {
    it('nothing to detect', function () {
      const { data } = directory('')
      data.should.be.eql({})
    })

    it('only detect brand', function () {
      const { data } = directory('ezzy')
      data.should.be.eql({
        brand: 'Ezzy'
      })
    })

    it('detect brand and model', function () {
      const {data} = directory('vendo vela ezzy panther')
      data.should.be.eql({
        brand: 'Ezzy',
        model: 'Panther'
      })
    })
  })

  describe('output', function () {
    it('remove brand', function () {
      const { output } = directory('vendo vela ezzy')
      output.should.be.equal('vendo vela ')
    })

    it('remove brand and model', function () {
      const { output } = directory('vendo vela ezzy panther')
      output.should.be.equal('vendo vela  ')
    })
  })
})
