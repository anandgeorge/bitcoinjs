var LineByLineReader = require('line-by-line');
var lr = new LineByLineReader('/root/.forever/L-_r.log');

var counter = 0;

lr.on('error', function (err) {
	console.log('Error processing file')
});

lr.on('line', function (line) {
	console.log(line,counter);
	JSON.parse(line);
	counter++;
});

lr.on('end', function () {
	console.log('Done reading file', counter);
});