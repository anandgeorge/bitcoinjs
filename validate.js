var evaluate = require('bitcoin-script').evaluate;
var script = '2 3 OP_ADD 5 OP_EQUAL';
console.log(evaluate(script));
