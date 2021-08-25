const bs58 = require('bs58')
 
const bytes = Buffer.from('003c176e659bea0f29a3e9bf7880c112b1b31b4dc826268187', 'hex')
const address = bs58.encode(bytes)
console.log(address)
const out = bs58.decode(address)
console.log(out.toString('hex'))
