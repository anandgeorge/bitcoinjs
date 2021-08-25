const secp256k1 = require('secp256k1')
var bitcoin = require("bitcoinjs-lib")
var bigi = require('bigi')
var bs58check = require('bs58check')
var wif = require('wif');
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'blockchain';
const bcoin = require('bcoin');
const Client = bcoin.http.Client;

const client = new bcoin.http.Client({
	uri: 'http://173.249.33.195:8332',
  	apiKey: 'patalmypal'
});


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
		return {id:address, key:privKeyWif};
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
	return str;
}

MongoClient.connect(url, function(err, cli) {
	(async () => {
	  	await client.open();
	  	const db = cli.db(dbName);
		for(var i=0; i<0xFFFFFFFFFFFFF;i++) {
			var ret = logger(generateRandomHex());
			console.log(ret);
			const coins = await client.getCoinsByAddress(ret.id);
			var value = _.sumBy(coins, 'value');
			if( value > 0) {
				ret.value = value;
				db.collection('coins').insert(ret);
			}
		}
	})().catch((err) => {
	  console.error(err.stack);
	});
});	

