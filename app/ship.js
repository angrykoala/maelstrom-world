/*
Name:Ship Model
Project: Maelström - World
Author: demiurgosoft <demiurgosoft@hotmail.com>
Description:
*/
"use strict";

var map = require('./map');
var utils = require('./utils');

var Ship = function(name, user, shipModel, city) {
	this.name = name;
	this.owner = user.id;
	this.sockets = user.sockets;
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
	var prods = this.cargo;
	for (var p in prods) {
		if (!prods.hasOwnProperty(p)) continue;
		cargo += this.cargo[p];
	}
	return cargo;
};
Ship.prototype.checkCargo = function(quantity) {
	return ((quantity + this.getCurrentCargo()) <= this.model.cargo && quantity >= 0);
};
Ship.prototype.addProduct = function(product, quantity) {
	var q = parseInt(quantity);
	if (!q) return false;
	if (this.checkCargo(q)) {
		this.cargo[product] = this.cargo[product] + q || q;
		return true;
	} else return false;
};
Ship.prototype.move = function(destiny, done) {
	if (this.status.value !== "docked") return done("Ship is not docked");
	if (destiny === this.city) return done("Already in city");
	var thisShip = this;
	map.getDistance(this.city, destiny, function(err, res) {
		if (err) return done(err);
		var spd = thisShip.model.speed;
		var time = res / spd;
		thisShip.setStatus("traveling", {
			remaining: time,
			destiny: destiny
		});
		done(null);
	});
};
Ship.prototype.removeProduct = function(product, quantity) {
	if (this.cargo[product] >= quantity) {
		this.cargo[product] -= quantity;
		if (this.cargo[product] === 0) delete this.cargo[product];
		return true;
	} else return false;
};
Ship.prototype.update = function() {
	if (this.status.value === "traveling") {
		this.status.remaining--;
		if (this.status.remaining <= 0) {
			this.reportShip();
			this.status.value = "docked";
			this.city = this.status.destiny;
		}
	}
};
Ship.prototype.reportShip = function() {
	for (var s in this.sockets) {
		this.sockets[s].emit('ship_arrive', {
			name: this.name,
			status: this.status,
			city: this.city,
			slug: this.slug
		});
	}
};
Ship.prototype.toJSON = function() {
	return {
		name: this.name,
		owner: this.owner,
		model: this.model,
		life: this.life,
		city: this.city,
		status: this.status,
		cargo: this.cargo,
		slug: this.slug
	};

};
var ShipModel = function(name, data) {
	this.name = name;
	data = data || {};
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
