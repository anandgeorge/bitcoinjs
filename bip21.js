var bip21 = require('bip21')

var decoded = bip21.decode('bitcoin:1BgGZ9tcN4rm9KBzDn7KprQz87SZ26SAMH?amount=20.3&label=Foobar')

console.log(decoded)
// { address: '1BgGZ9tcN4rm9KBzDn7KprQz87SZ26SAMH',
//   options: {
//     amount: 20.3,
//     label: 'Foobar' }
// }
//
// WARNING: Remember to error check the `.address`!

console.log(bip21.encode('1BgGZ9tcN4rm9KBzDn7KprQz87SZ26SAMH'))
// => bitcoin:1BgGZ9tcN4rm9KBzDn7KprQz87SZ26SAMH

console.log(bip21.encode('1BgGZ9tcN4rm9KBzDn7KprQz87SZ26SAMH', {
	amount: 20.3,
	label: 'Foobar'
}))
// => bitcoin:1BgGZ9tcN4rm9KBzDn7KprQz87SZ26SAMH?amount=20.3&label=Foobar
