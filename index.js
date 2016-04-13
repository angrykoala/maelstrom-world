//ONLY FOR BASIC TESTING

var app = require('express')();
require('./app/routes.js')(app); //loads routes

var world = require('./app/world');
var City = require('./app/city');
var Ship = require('./app/ship');
var gu = require('./app/game_update');

var version = process.env.npm_package_version;

//token for testing: eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjU3MDYxOTc1MjkzZTNlMWYyM2M1YTBlOCIsInVzZXJuYW1lIjoiYXJ0aHVyIiwiaWF0IjoxNDYwMDE3NTI1LCJleHAiOjE0NjAwMjExMjV9.J7tiTx6U9lwCIfQxe9cDIhyt4N4yJFYZcdfJguXWJ0Q
var c1 = new City("Granada", [-2, 6]);
var c2 = new City("Madrid", [1, 321]);
var s1 = new Ship("Galleon", {
	life: 100,
	speed: 10,
	price: 43,
	cargo: 2000
});
world.users.addUser("57061975293e3e1f23c5a0e8", function(err, u1) {
	u1.buildShip("Black Pearl", s1, "Granada", function(err,blackpearl) {
		world.map.addCity(c1);
		world.map.addCity(c2);
		world.ships.addShip(s1);
		blackpearl.addProduct("Rice",100);	
		blackpearl.addProduct("Bread",20);		
		u1.buildShip("Flying Dutchman", s1, "Madrid", function() {});
	});

});

console.log("Maelström - World");
if (version) console.log("Version " + version);

app.listen(8080, function() {
console.log("Server listening on port 8080");
	gu.startLoop(null, function(err) {
		var date = new Date();
		var sec = date.getSeconds();
		if (err)
			console.log("Tick: Error - " + err);
		//	else
		//		console.log("Tick: No Error");
	});
	//console.log(JSON.stringify(world.users));
});
