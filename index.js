var express = require('express');
var app = express();

var bodyParser=require('body-parser');
app.use(bodyParser.json());//used to use the json data comming

app.get('/', function(req, res){
	console.log("visit:- http://localhost:3000")
   res.send("Hello world!");
});

app.get('/pandu',function(req,res){
	console.log("switched to the pandu page");
	console.log("http://localhost:300/pandu");
	res.send("hello this is the pandu page"+Date.now());
});

app.post('/pandu',function(req,res){
	console.log(req.body);
	res.send(req.body+"this is the sended json data");
	console.log("this is the post request of the json data");
});
app.listen(3000);