//ONLY FOR BASIC TESTING


var app = require('express')();
var http = require('http').createServer(app);
require('./app/routes')(app); //loads routes
ws = require('./app/websockets');

var serverConfig = require('./config/server');
var config = require('./config/config');

var World = require('./app/world');
var City = require('./app/city');
var Product = require('./app/product');
var Ship = require('./app/ship');
var gu = require('./app/game_update');

var loadData = require('./app/data_loader');

var version = process.env.npm_package_version;

//token for testing: eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjU3Mjc0MGI4ZjA4Nzg5MGQwZDM3NjAyMiIsInVzZXJuYW1lIjoiYXJ0aHVyIiwiaWF0IjoxNDYyMTkwNDEwLCJleHAiOjE0NjQ3ODI0MTB9.4XSx2yJDhY9V2ptUT0I_r1bQqfJIkfZ3brJRtPrAx7I


loadData();
/*World.users.addUser("5728f55b143b3e8639eed3b4", function(err, u1) {
	var s1 = World.ships.getShip("schooner");
	u1.buildShip("Black Pearl", s1, "london", function(err, blackpearl) {});
});*/

console.log("Maelström - World");
World.restore(function(err) {
	if (err) console.log(err);
	if (version) console.log("Version " + version);
	if(config.backup) console.log("Backup ON");
	else console.log("Backup OFF");
	ws.set(http, function(err, io) { //load websockets
		if (err) console.log(err);
		World.setSockets(io, function(err) {
			if (err) console.log(err);
			http.listen(serverConfig.port, function() {
				console.log("Server listening on port " + serverConfig.port);
				gu.startLoop(null, function(err) {
					var date = new Date();
					var sec = date.getSeconds();
					if (err)
						console.log("Tick: Error - " + err);
				});
			});
		});
	});
});
