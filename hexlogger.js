const secp256k1 = require('secp256k1')
var bitcoin = require("bitcoinjs-lib")
var bigi = require('bigi')
var bs58check = require('bs58check')
var wif = require('wif');
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'blockchain';

function logger(str) {
	const buff = Buffer.from(str, "hex")
	const privKey = buff;
	const privKeyStr = privKey.toString('hex');
	const privKeyWif = wif.encode(128, privKey, true);

	if(secp256k1.privateKeyVerify(privKey)) {
		const pubKeyCompressed = secp256k1.publicKeyCreate(privKey)
		const pubKeyUncompressed = secp256k1.publicKeyConvert(pubKeyCompressed, false);
		const pubKeyStr = pubKeyCompressed.toString('hex');
		const pubKeyUStr = pubKeyUncompressed.toString('hex');
		const publicKey = new Buffer(pubKeyUncompressed, 'hex')
		const publicKeyHash = bitcoin.crypto.hash160(publicKey)
		const address = bitcoin.address.toBase58Check(publicKeyHash, bitcoin.networks.bitcoin.pubKeyHash)
		return {_id:address, key:privKeyWif};
		// console.log(privKeyStr,privKeyWif, pubKeyStr, pubKeyUStr,address)
		// console.log(privKeyStr, privKeyWif, address)

	}
	else {
		console.log("Not vaid key", privKey);
		return null;
	}

}

var _ = require('lodash');

var base = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F'];

function generateRandomHex() {
	var str = '';
	for(var i=0; i<64; i++) {
		str += base[Math.floor(Math.random() * 16)]
	}
	// console.log(str);
	return str;
}

var counter = 0;
var insertSet = [];

for(var i=0; i<0xFFFFFFFFFFFFF;i++) {
	var ret = logger(generateRandomHex());
	if(ret) {
		insertSet.push(ret);
	}
	// console.log(counter);
	if(counter === 1000) {
		const db = client.db(dbName);
		db.collection('wif').insertMany(insertSet);
		console.log(insertSet[0], insertSet.length);
		insertSet = [];
		counter = 0;
	}
	counter++;
}


