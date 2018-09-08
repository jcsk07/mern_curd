var express = require('express');
var app = express();
var bodyParser=require('body-parser');
app.use(bodyParser.json());//used to use the json data comming
app.use(bodyParser.urlencoded({extended: true}));
var path=require('path');



//---------TO CREATE A COLLECTION WITH PREDEFINED FIELDS WE USE THE FOLLOWING---------------
//NOTE:- we call collection as the model in this 
var mongoose=require('mongoose');//used to connect the mongodb 
mongoose.connect('mongodb://localhost/my_db_crud', { useNewUrlParser: true });//used to connect the mongodb databes named:"my_db_crud"
//TO CHECK WEATHER THE MONGODB CONNECTION IS PRESENT OR NO WE USE THE FLG:-
var db = mongoose.connection;


//declaring a schema for a collection
var studentSchema = new mongoose.Schema({  //we are creating the Schema of collection with different fields
	textnames : String,
	fathername : String,
	sex : String,
	City : String,
	emailid : String,
	mobileno : String 
});

//To create the Collection we use model in the mongoose.model("model_name",Schema)
var stdetails = mongoose.model('stdetails', studentSchema);
//The above code defines the schema for a student and is used to create a Mongoose Mode stu_details.
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("connected to mongodb my_db_crud");
});

//WE ARE PLACING THE POST METHOD IN THIS AND ALSO INSERTING THE DATA TO THE COLLECTION

app.post('/studentform',function(req,res){
	var person = req.body; //taking the json data into the person
	

	var stu = new stdetails({  //creating a document for databese with the predeclared mode
		textnames : person.textnames, //assigning the data from person to the stu using dot operator
		fathername : person.fathername,
		sex : person.sex,
		City : person.City,
		emailid : person.emailid,
		mobileno : person.mobileno
	});
	//saving the student details as follows:-
	stu.save(function(err,stu_details){
		if(err)
			console.log("Failed to Insert the data");
		else
			console.log("Successfully inserted document");

	});
	res.send(person.textnames);
	console.log(JSON.stringify(req.body));
	console.log("this is the post request of student form");
}); 

//------------------ROUTING THE HTML PAGES--------------------


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




app.listen(3000);