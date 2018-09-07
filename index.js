var express = require('express');
var app = express();
var bodyParser=require('body-parser');
app.use(bodyParser.json());//used to use the json data comming
app.use(express.urlencoded());
var mongoose=require('mongoose');//used to connect the mongodb 
mongoose.connect('mongodb://localhost/my_db_crud', { useNewUrlParser: true });//used to connect the mongodb databes named:"my_db_crud"

var path=require('path');

app.get('/', function(req, res){
	console.log("visit:- http://localhost:3000")
   res.send("Hello world!");
});

app.get('/pandu',function(req,res){
	console.log("switched to the pandu page");
	console.log("http://localhost:300/pandu");
	res.send("hello this is the pandu page"+Date.now());
});

app.post('/pandu',function(req,res){ //the json data is present in the body of the request
	console.log(req.body.name);//we are printing the json data with a specific variable 
    res.json(req.body);//sending the json data as a response
	console.log("this is the post request of the json data");
});

app.get('/studentform',function(req,res){
	res.sendFile(path.join(__dirname + '/html_pages/student_form.html'));
});

app.post('/studentform',function(req,res){
	var person = req.body;
	res.send(person.textnames);
	console.log(JSON.stringify(req.body));
	console.log("this is the post request of student form");
}); 
//---------TO CREATE A COLLECTION WITH PREDEFINED FIELDS WE USE THE FOLLOWING---------------
//NOTE:- we call collection as the model in this 

app.listen(3000);