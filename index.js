var express = require('express');
var app = express();
var bodyParser=require('body-parser');
app.use(bodyParser.json());//used to use the json data comming
app.use(bodyParser.urlencoded({extended: true}));
var path=require('path');
var Mongodb=require('mongodb');

//---------TO CREATE A COLLECTION WITH PREDEFINED FIELDS WE USE THE FOLLOWING---------------
//NOTE:- we call collection as the model in this 
var mongoose=require('mongoose');//used to connect the mongodb 
mongoose.connect('mongodb://localhost/my_db_crud', { useNewUrlParser: true });//used to connect the mongodb databes named:"my_db_crud"
//TO CHECK WEATHER THE MONGODB CONNECTION IS PRESENT OR NO WE USE THE FLG:-
var db = mongoose.connection;

//declaring a schema for a collection
var x;

var studentSchema = new mongoose.Schema({  //we are creating the Schema of collection with different fields
	sno:Number,
	textnames : String,
	fathername : String,
	sex : String,
	City : String,
	emailid : String,
	mobileno : String 
});

//To create the Collection we use model in the mongoose.model("model_name",Schema)
var stdetails = mongoose.model('stdetails', studentSchema);
//we are creating a Schema for the count the no of users and also giving a unique number "sno"
var counterSchem = new mongoose.Schema({
	name: String,
	sno: Number
});
//creating a collection named counters 
var counter = mongoose.model('counters', counterSchem);
//the above one is to place a counter variable


//The above code defines the schema for a student and is used to create a Mongoose Mode stu_details.
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("connected to mongodb my_db_crud");
});

//WE ARE PLACING THE POST METHOD IN THIS AND ALSO INSERTING THE DATA TO THE COLLECTION
/*app.get('/count',async(req,res)=>{
	counter.update({name:'count'},{$inc:{sno:1}},function(err,doc){
		if(err)
			res.send('failed to update');
		else
			console.log('yep');
	});
	var f = await counter.find({name:'count'});
	var x = f[0].sno;
	x= parseInt(x);
	console.log(x);
	res.json(x);
});*/ //the above is to just check the counter value is incrementing while getting the get request

app.post('/studentform',async(req,res)=>{  //these are the asynchronous fuctions used 
	var person = req.body; //taking the json data into the person
	counter.update({name:'count'},{$inc:{sno:1}},function(err,doc){ //incrementing count value by one 
		if(err)
			res.send('failed');
		else
			console.log('post success with increment');
	});
	var fi = await counter.find({name:'count'});//sending the finda json data to fi
	var x= fi[0].sno; //assigning the sno value from fi[0] index to "x" variable
	x = parseInt(x);
	var y = Number(x);//converting into number and saving iot to the "y"
	var stu = new stdetails({
		sno : y,//assigning the unique sno by placing the "y"
		textnames : person.textnames,
		fathername : person.fathername,
		sex : person.sex,
		City: person.City,
		emailid : person.emailid,
		mobileno : person.mobileno
	});
	stu.save(function(err,st){  //saving the stu details into the stdetails collection
		if(err)
			res.send('failed to insert');
		else
			res.send('inserted successfully');
	});
	console.log(y);
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
	/*counter.update({name:'count'},{$inc:{sno:1}},function(err,doc){
		if(err)
			res.send('failed to update');
		else
			console.log('yep');
	});
	var f = await counter.find({name:'count'});
	x = f[0].sno;
	x= parseInt(x);
	console.log(x);*/
	res.sendFile(path.join(__dirname + '/html_pages/student_form.html'));
});

app.get('/retrive',function(req,res){
	stdetails.find(function(err,response){
		res.json(response);
	});
});
//------------------FINDING THE DOCUMENT FROM DATABASE---------------------
app.get('/find',function(req,res){
	stdetails.find({textnames:"chandu",fathername:"anji"},'textnames fathername',function(err,docs){
		res.json(docs);
	});
});


//---------------------UPDATING THE DOCUMENTS----------------------
var up;
var dat;
app.get('/update',function(req,res){ //it shows the form to select the document based on the parameters
	res.sendFile(path.join(__dirname + '/html_pages/update_form1.html'));
});

//The action from the update_form.html is sent as post request to the "/updateform" 

app.post('/updateform',function(req,res){
	up=req.body;
	res.sendFile(path.join(__dirname + '/html_pages/update_form2.html'));
});    //this is to redirtedt to the updation form

//the action from the update_form2.html is send as a post request for the "/completeupdate"

app.post('/completeupdate',function(req,res){
	dat=req.body; //the dat consist of the updated json data
	stdetails.update({textnames:up.textnames},{$set:{
		fathername:dat.fathername,
		emailid:dat.emailid,
		mobileno:dat.mobileno
	}},function(err,response){
		if(err)
			res.send('Failed');
		else{
			console.log("SUCCESSFULLY UPDATED");
			res.send('SUCCESSFULLY UPDATED');

		}
	});
});

//in above the {textnames:up.textnames} is the data for finding the documents 
//The {$set:{fathername:dat.fathername,..}} are the data in the fields of dat to update the values of the document

//In above the stdetails is the name of the model or the collection name

/*----------------------------------DELETION OF DOCUMENT -----------------------------------------------*/

/*yourModelObj.findOneAndRemove(conditions, options, callback)
yourModelObj.findByIdAndRemove(id, options, callback)

yourModelObj.remove(conditions, callback);

var query = Comment.remove({ _id: id });
query.exec();


Models have static deleteOne() and deleteMany() functions for removing all documents matching the given filter.

Tank.deleteOne({ size: 'large' }, function (err) {
  if (err) return handleError(err);
  // deleted at most one tank document
});
*/

app.get('/delete',function(req,res){
	res.sendFile(path.join(__dirname + '/html_pages/delete_form.html'));
});
//the deletion of data based on "emailid" and "mobileno" fields
app.post('/delete',function(req,res){
	var del = req.body;
	stdetails.remove({emailid:del.emailid,mobileno:del.mobileno},function(err,response){
		if(err)
			res.send('Failed to delete the documnent');
		else
			res.send('DELETION SUCCESSFULLY COMPLETED');
	});
});

app.listen(3000);