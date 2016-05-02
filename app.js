//ONLY FOR BASIC TESTING


var app = require('express')();
var http = require('http').createServer(app);
require('./app/routes')(app); //loads routes
ws = require('./app/websockets');

var world = require('./app/world');
var City = require('./app/city');
var Product = require('./app/product');
var Ship = require('./app/ship');
var gu = require('./app/game_update');

var loadData = require('./app/data_loader');

var version = process.env.npm_package_version;

//token for testing: eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjU3Mjc0MGI4ZjA4Nzg5MGQwZDM3NjAyMiIsInVzZXJuYW1lIjoiYXJ0aHVyIiwiaWF0IjoxNDYyMTkwNDEwLCJleHAiOjE0NjQ3ODI0MTB9.4XSx2yJDhY9V2ptUT0I_r1bQqfJIkfZ3brJRtPrAx7I
/*var c1 = new City("Granada", [-2, 6]);
var c2 = new City("Madrid", [1, 321]);
var s1 = new Ship("Galleon", {
	life: 100,
	speed: 10,
	price: 43,
	cargo: 2000
});*/
world.users.addUser("572740b8f087890d0d376022", function(err, u1) {
	/*world.products.addProduct(new Product("Rice", 2));
	world.products.addProduct(new Product("Bread", 1));
	u1.buildShip("Black Pearl", s1, "granada", function(err, blackpearl) {
		world.map.addCity(c1);
		world.map.addCity(c2);
		c1.addProduct("Rice", 50, 1);
		c2.addProduct("Rice", 50, 2);
		c1.addProduct("Bread", 10, 1);
		c2.addProduct("Bread", 50, -1);
		world.ships.addShip(s1);
		blackpearl.addProduct("Rice", 100);
		blackpearl.addProduct("Bread", 20);
		u1.buildShip("Flying Dutchman", s1, "madrid", function() {});
	});*/
});
loadData();

console.log("Maelström - World");
if (version) console.log("Version " + version);
ws.set(http, function(err, io) { //load websockets
	if (err) console.log(err);
	world.setSockets(io, function(err) {
		if (err) console.log(err);
		http.listen(8080, function() {
			console.log("Server listening on port 8080");
			gu.startLoop(null, function(err) {
				var date = new Date();
				var sec = date.getSeconds();
				if (err)
					console.log("Tick: Error - " + err);
				//	else
				//		console.log("Tick: No Error");
			});
		});
	});
});