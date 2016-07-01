"use strict";

var World = require('./world');
var Product = require('./product');
var ShipModel = require('./ship');
var City = require('./city');

module.exports = function() {
	var productData = require('../resources/products.json');
	var shipModelsData = require('../resources/ship_models.json');
	var cityData = require('../resources/map.json');
	for (var i = 0; i < productData.length; i++) {
		var prod = new Product(productData[i].name, productData[i].price);
		World.products.addProduct(prod);
	}
	for (i = 0; i < shipModelsData.length; i++) {
		var sm = new ShipModel(shipModelsData[i].name, shipModelsData[i]);
		World.ships.addShip(sm);
	}
	for (i = 0; i < cityData.length; i++) {
		var city = new City(cityData[i].name, cityData[i].position);
		var cp = cityData[i].products;
		for (var p in cp) {
			city.addProduct(p, 10, cp[p].production);
		}
		World.map.addCity(city);
	}

};