var bitcoin = require("bitcoinjs-lib")
var bigi = require('bigi')

function rng () { return Buffer.from('thisanotherrandomnumbergenerator') }

var keyPair = bitcoin.ECPair.makeRandom({ rng: rng });
var address = keyPair.getAddress()
console.log(address, JSON.strigkeyPair);
