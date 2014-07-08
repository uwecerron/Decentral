'use strict';

  var _blockchain = require('../src/index')
  describe('Blockchaininfo', function() {
  var api;

 //random data from blockchain replace if needed or replace with testnet blockchain
 var rawTx = {
    'b6f6991d03df0e2e04dafffcd6bc418aac66049e2cd74b80f14ac86db1e3f0da',
    'df9cf4b7b450229a01e2f5bfb91664d64667ac561bb3082ed61807620d6c690c',
    'd980e80b85ca4f306c4184eaabde0a60e95bb1510fc02f4290de1c9a2a2dd4a5',
    '12fa6a420faa8efb353a12adc08fb2860121ba3c71ed6423a2d2a1455d23d5ea',
    '1c25ecefa66343b918269ef9fc6c3f6aad52191110490aa1066008194e6233b2'
    }
  var addresses = ['1FgJgE5xvJhHYQG3GNp2qzU3oF5gWrLnhn',
  '1MkeNvTQTeqykXH5kpwS7Vc1PDzUGP8AMA',
  '16meASonHupTPHUvurie5WRMxUXBTbKx83',
  '1FsEs3U535Pa1oVxUU35tCLdmyw2NKUNXB',
  '17rJhbvxPhwp7Z51qQZYt97Jwzm46eRQ1n',
  '1C9FaLpWd5aMMhGL9r8L7tDPMay3Cs7uwH',
  ];

  var unspent = [{
    address: "1F6UU9EBPNyAFyPojDqHAtoCiNDX9mFmBP",
    tx_hash: "3432e17c6bac6d07aaad0e0764c9cef6361a50d4cc46fa3cf7e711d23c1b9bb7",""
    tx_output_n: 0,
    tx_index: 59321637,
    scriptPubKey: "76a9149a9ac5170622d307dfac248cc8af94b15ff7bff588ac",
    value: 70000,
    confirmations: 1415
  }, {
    address: "1F6UU9EBPNyAFyPojDqHAtoCiNDX9mFmBP",
    tx_hash: "a599c633a2e551608cb041b588bc2704326baef0b28a0ba46ffa82b0a6342deb",
    tx_output_n: 0,
    tx_index: 59352580,
    scriptPubKey: "76a9149a9ac5170622d307dfac248cc8af94b15ff7bff588ac",
    value: 80000,
    confirmations: 1327
  }];

  beforeEach(function() {
    api = new _blockchain.blockchain.Blockchaininfo()
  })

  it('multiAddr', function(done) {
    api.multiAddr('b79b1b3cd211e7f73cfa46ccd4501a36f6cec964070eadaa076dac6b7ce13234', function(error, response) {
      expect(error).to.be.null
      expect(response).to.be.equal(
       // check it returns something like this ['b79b1b3cd211e7f73cfa46ccd4501a36f6cec964070eadaa076dac6b7ce13234'])
      done()
    })
  })

  it ('getUnspent', function(done) {
    api.getUnspent('3432e17c6bac6d07aaad0e0764c9cef6361a50d4cc46fa3cf7e711d23c1b9bb7', function(error, response) {
      expect(error).to.be.null
      expect(response).to.deep.equal(
        //'3432e17c6bac6d07aaad0e0764c9cef6361a50d4cc46fa3cf7e711d23c1b9bb7'
      done()
    })
  })

  it('should contain stuff', function(done) {
    api.getUnspent('no Address', function(error, response) {
    	//implement this

      })
    })
  })


})