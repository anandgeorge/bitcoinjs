const secp256k1 = require('secp256k1')

function logger(str) {
	const buff = Buffer.from(str, "hex")
	const privKey = buff;

	if(secp256k1.privateKeyVerify(privKey)) {
		return true;
	}
	else {
		return false;
	}

}

var _ = require('lodash');

var base = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F'];

var counter = 0;
var insertSet = {};
for(var i=0; i<16; i++) {
	insertSet[base[i]] = Array(64).fill(0)
}

function generateRandomHex() {
	var arr = [];
	for(var i=0; i<64; i++) {
		var num = Math.floor(Math.random() * 16);
		arr.push(base[num]);
	}
	return arr;
}

for(var j=0; j<0xFFFFFFFFFFFFF;j++) {
	for(var i=0; i<0xFFFFFFFFFFFFF;i++) {
		var retArr = generateRandomHex();
		if(logger(retArr.join(''))) {
			for(var i=0;i<64;i++) {
				var a = retArr[i];
				insertSet[a][i]++
			}
		}
		if(counter === 10000000) {
			counter = 0;
			console.log(JSON.stringify(insertSet));
		}
		counter++;
	}	
}

console.log('Done');

