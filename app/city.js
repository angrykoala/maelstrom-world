/*
Name: City
Project: Maelström - World
Author: demiurgosoft <demiurgosoft@hotmail.com>
Description: 
*/

var productList = require('./world').products;
var utils = require('./utils');

var city = function(name, position, products) {
	if (name) this.name = name;
	if (position) this.position = [position[0], position[1]];
	this.products = products || {};
	this.slug = utils.slugify(this.name);
};
city.prototype.addProduct = function(productName, quantity, productionRate) {
	this.products[productName] = {
		"quantity": quantity,
		"production": production,
	};
};
city.prototype.sellProduct = function(productName, quantity, done) {
	if (!productName || quantity < 0) return done(new Error("Bad data"));
	var p = this.products[productName];
	if (!p) return done(new Error("Not product in city"));
	p.quantity += quantity;
	return done();
};
city.prototype.buyProduct = function(productName, quantity, done) {
	if (!productName || quantity < 0) return done(new Error("Bad data"));
	var p = this.products[productName];
	if (!p) return done(new Error("Not product in city"));
	if (p.quantity < quantity) return done(new Error("Not enough quantity"));
	p.quantity += quantity;
	return done();
};
city.prototype.getPrice = function(productId, quantity, done) {
	if (!productName || quantity < 0) return done(new Error("Bad data"));
	var p = productList.getProduct(productId);
	if (!p) return done(new Error("not product found"));
	return done(p.price * quantity);
};
city.prototype.update = function() {
	var prods = this.products;
	for (var prod in prods) {
		if (!prods.hasOwnProperty(key)) continue;
		var obj = prods[prod];
		obj.quantity += obj.productionRate;
		if (obj.quantity < 0) obj.quantity = 0;
	}
};


module.exports = city;