var bitcoin = require("bitcoinjs-lib")
var bigi = require('bigi')

function rng () { return Buffer.from('thisanotherrandomnumbergenerator') }

var keyPair = bitcoin.ECPair.makeRandom({ rng: rng });
var pubKey = keyPair.getPublicKeyBuffer();
var scriptPubKey = bitcoin.script.witnessPubKeyHash.output.encode(bitcoin.crypto.hash160(pubKey))
var address = bitcoin.address.fromOutputScript(scriptPubKey);
var addressBase58check = keyPair.getAddress()
// console.log(pubKey, scriptPubKey, address, addressBase58check);
console.log(address, addressBase58check);

var bs58check = require('bs58check')

console.log(bs58check.encode(pubKey))
