var coinfs = require('coinfs')
 
var options = {
  network: 'bitcoin',
  inputs: 1
}
 
coinfs.estimateCost('./bip21.js', options, function(err, cost) {
  console.log(cost)
})