var express = require("express");
var app = express();
var server = require("http").createServer(app);
var mongoose = require("mongoose");


server.listen(3000);


mongoose.connect('mongodb://localhost/geo', function(err){
	if(err){
		console.log(err);
	}else{
		console.log("Connected");
	}
});

var geoSchema = mongoose.Schema({
	name: String,
	email: String,
	description: String,
	lat: String,
	long: String
});

var Geo = mongoose.model('Geo',geoSchema);


module.exports = Geo;


app.get('/', function(req, res){
	res.sendfile(__dirname + '/index.html');
	//app.use(express.static(__dirname + '/script'));
	//app.use('/static', express.static(__dirname + '/script'));
});



  function Person(name, email, description, lat, long){
  	this.name = name;
  	this.email = email;
  	this.description = description;
  	this.lat = lat; 
  	this.long = long;

  	this.create = function(){
  		var newInfo = new Geo({name: this.name, 
  			email:this.email, discription: this.description, 
  			lat: this.lat, long: this.long});

  		newInfo.save(function(err){
  			if(err) throw err;
  			console.log("Dodany rekord");
  		});
  	};

  	this.list = function(){
  		Geo.find({}, function(err, docs){
  			if(err) throw err;
  			console.log(docs);
  		});
  	};
  };

  var firstPerson = new Person("Jan", "j@gmail.com", "opis", "0", "0");
  var secondPerson = new Person("Anna", "a@gmail.com", "opis", "20", "20");



  secondPerson.create();
  firstPerson.list();
