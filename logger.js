const { randomBytes } = require('crypto')
const secp256k1 = require('secp256k1')
var bitcoin = require("bitcoinjs-lib")
var bigi = require('bigi')
var bs58check = require('bs58check')
var wif = require('wif');

var p = 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFC2F

function logger(strn) {
	for(var i=strn.min; i<strn.max; i++) {
		const str = strn.str + i;
		const buff = Buffer.from(str, "hex")

		const privKey = buff;
		const privKeyStr = privKey.toString('hex');
		const privKeyWif = wif.encode(128, privKey, true);

		if(secp256k1.privateKeyVerify(privKey)) {
			const pubKeyCompressed = secp256k1.publicKeyCreate(privKey)
			const pubKeyUncompressed = secp256k1.publicKeyConvert(pubKeyCompressed, false);
			const pubKeyStr = pubKeyCompressed.toString('hex');
			const publicKey = new Buffer(pubKeyUncompressed, 'hex')
			const publicKeyHash = bitcoin.crypto.hash160(publicKey)
			const address = bitcoin.address.toBase58Check(publicKeyHash, bitcoin.networks.bitcoin.pubKeyHash)
			// console.log(privKeyStr,privKeyWif, pubKeyUncompressed, pubKeyCompressed)
			console.log(privKeyStr, privKeyWif, address)

		}
		else {
			// console.log("Not vaid key", privKey);
		}
	}
}



var _ = require('lodash');

// var base = '0000000000000000000000000000000000000000000000000000000000000000';
var base = '00000000000000000000000000000000000000000000000000FFFFFFFFFFFFFF';

var sets = [];

for(var i=63; i>0; i--) {
	var subStr = base.substring(0,i);
	var min = 1 + _.fill(Array(63-i),'0').join('');
	var max = 1 + _.fill(Array(64-i),'0').join('');
	var set = {str:subStr, min:parseInt(min), max:parseInt(max)}
	sets.push(set);
}

console.log(sets.length);

// for(var i=0, i< sets.length-1, i++) {
for(var i=12; i< 13; i++) {
	logger(sets[i]);
}


