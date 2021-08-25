var unlock = require('bitcoin-script').unlock;
var scriptSig = 'OP_1';
var scriptPubKey = 'OP_VERIFY';
console.log(unlock(scriptSig, scriptPubKey));
