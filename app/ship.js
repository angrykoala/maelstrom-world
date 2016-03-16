/*
Name:Ship Model
Project: Maelström - World
Author: demiurgosoft <demiurgosoft@hotmail.com>
Description: 
*/
var map = require('./map');
var utils = require('./utils');

var Ship = function(name, user, shipModel, city) {
	this.name = name;
	this.owner = user.id;
	this.model = shipModel;
	this.life = shipModel.life;
	this.city = city;
	this.setStatus("docked");
	this.cargo = {};
	this.slug = utils.slugify(name);
};
Ship.prototype.setStatus = function(status, data) { //TODO: make this private
	this.status = data || {};
	this.status.value = status;
};
Ship.prototype.getCurrentCargo = function() {
	var cargo = 0;
	var prods=this.cargo;
	for (var p in prods) {
		if (!prods.hasOwnProperty(p)) continue;
		cargo += this.cargo[p];
	}
	return cargo;
};
Ship.prototype.addProduct = function(product, quantity) {
	if ((quantity + this.getCurrentCargo()) <= this.model.cargo && quantity >= 0) {
		this.cargo[product] = this.cargo[product] + quantity || quantity;
		return true;
	} else return false;
};
Ship.prototype.move = function(destiny, done) {
	if (this.status.value !== "docked") return done(new Error("Ship is not docked"));
	map.getDistance(this.city, destiny, function(err, res) {
		if (err) return done(err);
		var spd = this.model.speed;
		var time = res / spd;
		this.setStatus("traveling", {
			remaining: time,
			destiny: destiny
		});
		done();
	});
};
Ship.prototype.removeProduct = function(product, quantity) {
	if (this.cargo[product] >= quantity) {
		this.cargo[product] -= quantity;
		if (this.cargo[product] === 0) delete this.product[product];
	} else return false;
};
Ship.prototype.update = function() {
	if (this.status.value === "traveling") {
		this.status.remaining--;
		if (this.status.remaining <= 0) {
			this.status.value = "docked";
			this.city = this.status.destiny;
		}
	}
};
var ShipModel = function(name, data) {
	this.name = name;
	data=data || {};
	this.life = data.life || 0;
	this.speed = data.speed || 0;
	this.price = data.price || 0;
	this.cargo = data.cargo || 0;
	this.slug = utils.slugify(name);
};
ShipModel.prototype.createShip = function(name, user, city) {
	return new Ship(name, user, this, city);
};

module.exports = ShipModel;
