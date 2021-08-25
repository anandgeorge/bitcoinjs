var _ = require('lodash');

var base = '0000000000000000000000000000000000000000000000000000000000000000';

var sets = [];

for(var i=63; i>0; i--) {
	var subStr = base.substring(0,i);
	var min = 1 + _.fill(Array(63-i),'0').join('');
	var max = 1 + _.fill(Array(64-i),'0').join('');
	var set = {str:subStr, min:min, max:max}
	// console.log(set);
	sets.push(set);
}

console.log(sets[6]);