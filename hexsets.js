var _ = require('lodash');

var base = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F'];

function generateRandomHex() {
	var str = '';
	for(var i=0; i<64; i++) {
		str += base[Math.floor(Math.random() * 16)]
	}
	console.log(str);	
}

generateRandomHex()

