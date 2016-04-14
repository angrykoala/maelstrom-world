/*
Name: User
Project: Maelström - World
Author: demiurgosoft <demiurgosoft@hotmail.com>
Description: 
*/

var map = require('./map');
var Utils = require('./utils');

var User = function(id) {
	this.id = id;
	this.ships = {};
	this.money = 1000;
};
User.prototype.buildShip = function(name, model, city, done) {
	if (this.ships[Utils.slugify(name)] === undefined) {
		if (this.money > model.price) this.money -= model.price;
		else return done(new Error("Not enough money"));
		var ship = model.createShip(name, this, city);
		this.ships[ship.slug] = ship;
		return done(null, this.ships[ship.slug]);
	} else return done(new Error("Ship already exists"));
};
User.prototype.getAllShips = function() {
	var res = [];
	for (var i in this.ships) {
		var s = this.ships[i];
		res.push({
			name: s.name,
			model: s.model.name,
			id: s.id,
			slug: s.slug,
			life: s.life,
			status: s.status.value
		});
	}
	return res;
	//return Object.keys(this.ships);
};
User.prototype.getShip = function(shipSlug) {
	return this.ships[shipSlug];
};
User.prototype.updateShips = function() {
	for (var i in this.ships) {
		if (!this.ships.hasOwnProperty(i)) continue;
		this.ships[i].update();
	}
};
User.prototype.buyProduct = function(shipId, product, quantity, done) {
	var ship = this.getShip(shipId);
	if (ship.status != "DOCKED") return done(new Error("Ship not docked"));
	var city = ship.city;
	map.getCity(city, function(err, res) {
		if (err) return done(new Error("City not valid"));
		city.getPrice(product, quantity, function(err, price) {
			if (err) return done(err);

			if (user.money < price) return done(new Error("Not enough money"));
			user.money -= price;
			city.buyProduct(product, quantity, function(err, res) {
				if (err) {
					user.money += price;
					return done(err);
				}
				ship.addProduct(product, quantity);
				return done();
			});
		});
	});
};
User.prototype.moveShip = function(shipId, destiny, done) {
	var s = this.getShip(shipId);
	if (!s) done(new Error("Not ship found"));
	s.move(destiny, done);
};
module.exports = User;