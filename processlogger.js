var LineByLineReader = require('line-by-line');
var  _ = require('lodash');
var wif = require('wif');

var secp256k1 = require('secp256k1')
var bitcoin = require("bitcoinjs-lib");
var maincounter = 0;
var counter = 0;
var insertSet = [];
var baseArr = _.range(64);
var base = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F'];

var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017';
var dbName = 'blockchain';

MongoClient.connect(url, function(err, client) {
	console.log("Connected successfully to server");
	const db = client.db(dbName);
	var startDate = new Date();
	var lr = new LineByLineReader('/root/.forever/L-_r.log');
	lr.on('error', function (err) {
		console.log('Error processing file')
	});

	lr.on('line', function (line) {
		lr.pause();
		(async() => {
			var arr = Array(64).fill(0);
			var subArr = [];

			if(line.indexOf('Forever') === -1) {
				var bestset = best(JSON.parse(line));
				_.map(bestset, function(val, key) {
					subArr = subArr.concat(val);
					_.map(val, function(v) {
						arr[v] = key;
					})
				});
				var diffArr = _.difference(baseArr, subArr);
				var loop = Array(diffArr.length - 2).fill('F');
				var loopHex = '0x' + loop.join('').toString();
				console.log(diffArr.length, loopHex);
				for(var i=0; i<parseInt(loopHex); i++) {
					_.map(diffArr, function(dt) {
						arr[dt] = base[Math.floor(Math.random() * 16)]
					})		
					var str = arr.join('');
					var ret = logger(str);
					if(ret) {
						insertSet.push(ret);
						counter++;	
					}
					if(counter === 1000) {
						var re = await db.collection('wif').insertMany(insertSet);
						console.log(insertSet[0], insertSet.length,new Date(), maincounter);
						insertSet = [];
						counter = 0;
					}
				}
				maincounter++;
				lr.resume();					
			}
			else {
				maincounter++;
				lr.resume();						
			}
		})().catch((err) => {
		    console.error(err.stack);
		});




	});

	lr.on('end', function () {
		console.log('startDate',startDate, counter);
		console.log('Done reading file');
	});
});

function best(set) {
	var obj = {};
	_.map(set, function(val, key) {
		var max = _.max(val);
		var sort = _.sortBy(val).reverse();
		var positions = _.map(_.slice(sort, 0, 4), function(st) {
			return val.indexOf(st);
		});
		obj[key] = positions;
	})
	return obj;
}

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
	}
	else {
		console.log("Not vaid key", privKey);
		return null;
	}

}