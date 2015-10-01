//pure node//
// var http = require('http');
// var fs = require('fs');

// http.createServer(function(req,res){
// 	res.writeHead(200,{
// 		'Content-Type':'text/html',
// 		'Access-Control-Allow-Origin':'*'
// 	});
// 	var readStream = fs.createReadStream(__dirname + '/index.html');
// 	readStream.pipe(res);
// }).listen(8000);

// console.log('Visit me at localhost:8000');

//using express//
var express = require('express');
var app = express();
var path = require('path');

// app.get('/',function(req,res){
// 	res.sendFile(path.join(__dirname + '/index.html'));
// });

//start routing using express router//
var basicRouter = express.Router();
var adminRouter = express.Router();
var apiRouter = express.Router();

// route middleware that will happen on every request
adminRouter.use(function(req, res, next) {

 // log each request to the console
 console.log(req.method, req.url);

 // continue doing what we were doing and go to the route
 next();
 });

adminRouter.get('/',function(req,res){
	res.send('I am dashboard');
});

adminRouter.get('/users',function(req,res){
	res.send('I showed all users');
});

// route middleware to validate :name
adminRouter.param('name', function(req, res, next, name) {
	// do validation on name here
	// blah blah validation
	// log something so we know its working
	console.log('doing name validations on ' + name);

	// once validation is done save the new item in the req
	req.name = name;
	// go to the next thing
	next();
});

adminRouter.get('/users/:name',function(req,res){
	res.send('Hello ' + req.params.name + '!');
});

adminRouter.get('/posts',function(req,res){
	res.send('I show all posts');
});

//basic route//
basicRouter.get('/',function(req,res){
	res.send('I am home');
});

//api route//
apiRouter.get('/',function(req,res){
	res.send('I will return api response');
});

//login route (directly use app.route to call express.Router(//
app.route('/login')
	.get(function(req, res) {
		res.send('this is the login form');
	})
	.post(function(req, res) {
		console.log('processing');
		res.send('processing the login form!');
	});

app.use('/',basicRouter);
app.use('/admin', adminRouter);
app.use('/api',apiRouter);

//server start//
app.listen(8000);
console.log("port 8000 is magic port");