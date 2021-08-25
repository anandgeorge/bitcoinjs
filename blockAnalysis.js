var BlockStream = require('blkdat-stream')
var blockStream = new BlockStream()

process.stdin.pipe(new BlockStream()).on('data', function (blockBuffer) {
	console.log(blockBuffer.toString('hex'));
	console.log("===============")

})