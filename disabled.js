var evaluate = require('bitcoin-script').evaluate;
var script = 'OP_2 OP_3 OP_MUL OP_6 OP_EQUAL OP_VERIFY';
console.log(evaluate(script, /* enableDisabled */ true));
