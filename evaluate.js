var evaluate = require('bitcoin-script').evaluate;
var script = '2 7 OP_ADD 3 OP_SUB 1 OP_ADD 7 OP_EQUAL';
console.log(evaluate(script));
