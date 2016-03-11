var async = require('async');

var World = require('../../app/world');
var Product = require('../../app/product');
var Ship = require('../../app/ship');
var City = require('../../app/city');

var data = require('./data');

var clear = function() {
	World.products.list = {};
	World.ships.list = {};
	World.users.users = {};
	World.map.clear();
};


var populate = function(done) {
	clear();
	insertProducts();
	insertShipModels();
	insertCities();
	insertUsers(done);
};
populate.clear=clear;
module.exports=populate;


function insertProducts() {
	var products = [];
	for (var p in data.products) products.push(new Product(data.products[p].name, data.products[p].price));
	for (var i = 0; i < products; i++) World.products.addProduct(products[i]);
}

function insertShipModels() {
	var ships = [];
	for (var s in data.ships) ships.push(new Ship(data.ships[s].name, data.ships[s]));
	for (var i = 0; i < ships.length; i++) World.ships.addShip(ships[i]);
}

function insertCities() {
	var cities = [];
	var productList = World.products.getProductList();
	for (var c in data.cities) {
		var cdata = data.cities[c];
		var l = cities.push(new City(cdata.name, [cdata.positionX, cdata.positionY]));
		var newcity = cities[l - 1];
		for (var p in productList) newcity.addProduct(p, 10, 1);
		for (var i = 0; i < cities.length; i++) World.map.addCity(cities[i]);
	}
}

function insertUsers(done) {
	async.forEachOf(data.users, function(user, key, cb) {
		World.users.addUser(user.id, function(err, res) {
			res.money = user.money;
			insertShip(res, cb);
		});
	}, function(err) {
		done();
	});
}

function insertShip(user, cb) {
	var modelName = data.ships.caravel.name;
	var shipModel = World.ships.getShip(modelName);
	user.buildShip("Black Pearl", shipModel, data.cities.isengard, cb);
}
