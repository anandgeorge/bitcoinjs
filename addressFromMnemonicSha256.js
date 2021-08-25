var bitcoin = require("bitcoinjs-lib")
var bigi = require('bigi')
var bs58check = require('bs58check')
var hash = bitcoin.crypto.sha256(Buffer.from('catch me if you can'))
var d = bigi.fromBuffer(hash)
var keyPair = new bitcoin.ECPair(d);
var privateKeyWIF = keyPair.toWIF()
console.log(hash, privateKeyWIF);
var privateKey = bs58check.decode( keyPair.toWIF() ).toString('hex')
var address = keyPair.getAddress()
console.log(address, privateKey, privateKeyWIF);
var keyPairRestore = bitcoin.ECPair.fromWIF(privateKeyWIF);
var address = keyPairRestore.getAddress()
// console.log(keyPairRestore,address)
console.log(address)

