//pure node//
var http = require('http');
var fs = require('fs');

http.createServer(function(req,res){
	res.writeHead(200,{
		'Content-Type':'text/html',
		'Access-Control-Allow-Origin':'*'
	});
	var readStream = fs.createReadStream(__dirname + '/index.html');
	readStream.pipe(res);
}).listen(8000);

console.log('Visit me at localhost:8000');

//using express//