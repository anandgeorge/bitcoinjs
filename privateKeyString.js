const { randomBytes } = require('crypto')
const secp256k1 = require('secp256k1')
var bitcoin = require("bitcoinjs-lib")
var bigi = require('bigi')
var bs58check = require('bs58check')
var wif = require('wif');
var odd = 0;
var even = 0;
var invalid = 0;
var notmatch = 0;

var p = 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFC2F
// var p = 0xFFFFFFFFFFFFFBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
// var p = 0xFFFFFFFFFFFFFCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA

// var buff = Buffer.from("038f4a37958b37237a83add8de1aa9d18461a4bc36ea0fbb8c976307d6dd57bf25", "hex")
// var buff = Buffer.from("1E99423A4ED27608A15A2616A2B0E9E52CED330AC530EDCC32C8FFC6A526AEDD", "hex")
// var buff = Buffer.from("1000000000000000000000000000000000000000000000000000000000000000", "hex")
// for(var i=100000; i<110000; i++) {
for(var i=10000; i<100000; i++) {
	var str = '00000000000000000000000000000000000000000000000000000000000' + i;
	// var str = 'FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFBF0000000000000000000000000' + i;
	// var str = 'FBFFFFFFFFFFFFFFFFFFFFF00000000000000000000000000000000000' + i;
	var buff = Buffer.from(str, "hex")

	let privKey = buff;
	var key = wif.encode(128, privKey, true)
	// let privKey;
	// do {
	//   privKey = randomBytes(32)
	// } while (!secp256k1.privateKeyVerify(privKey))

	if(secp256k1.privateKeyVerify(privKey)) {
		const pubKey = secp256k1.publicKeyCreate(privKey)
		const pubKeyConvert = secp256k1.publicKeyConvert(pubKey, false);
		const x = parseInt('0x' + privKey.toString('hex'));
		const y = parseInt('0x' + pubKey.toString('hex'));

		const result = (x*x*x + 7 - y*y*y) % p;
		// const result = (x*x*x + 7 - y*y);
		const pubKeyStr = pubKey.toString('hex');
		if(pubKeyStr.startsWith("02")) {
			even++
		}
		else if(pubKeyStr.startsWith("03")) {
			odd++
		}
		else {
			console.log('Invalid key', pubKeyStr);
		}
		if(result > 0) {
			notmatch++;
		}
		// console.log(privKey, pubKey,privKey.toString('hex'),pubKey.toString('hex'));
		// console.log(privKey.toString('hex'), key, pubKeyStr,result,pubKeyConvert.toString('hex'));
		console.log(privKey.toString('hex'), key);

		var publicKey = new Buffer(pubKeyConvert, 'hex')
		var publicKeyHash = bitcoin.crypto.hash160(publicKey)

		var address = bitcoin.address.toBase58Check(publicKeyHash, bitcoin.networks.bitcoin.pubKeyHash)

		// console.log(publicKey.toString('hex'))
		// console.log(publicKeyHash.toString('hex'))
		console.log(address)

	}
	else {
		console.log("Not vaid key", privKey, invalid++);
	}
}
console.log(odd, even,invalid,notmatch);

// var publicKey = new Buffer('04ba2416481d6260e621d8f2b6aad3e9c51d438c1876b624303a16f2bcf8a06cd695cef87230180ceed5735e7bf6cb3f9db360f6fee50824c85f230a6bb3ca9573', 'hex')
// var publicKeyHash = bitcoin.crypto.hash160(publicKey)

// var address = bitcoin.address.toBase58Check(publicKeyHash, bitcoin.networks.bitcoin.pubKeyHash)

// console.log(publicKey.toString('hex'))
// console.log(publicKeyHash.toString('hex'))
// console.log(address)

// x = (y^2 - 7)^ 1/3



