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
	this.money = 3000;
	this.sockets = {};
};

User.prototype.addSocket = function(socket) {
	var socks = this.sockets;
	if (!socks[socket.id]) {
		socks[socket.id] = socket;
		socket.on('disconnect', function() {
			delete socks[this.id];
		});
	}
	this.reportMoney();
};
User.prototype.buildShip = function(name, model, city, done) {
	if (this.ships[Utils.slugify(name)] === undefined) {
		if (this.money > model.price) this.money -= model.price;
		else return done(new Error("Not enough money"));
		var ship = model.createShip(name, this, city);
		this.ships[ship.slug] = ship;
		this.reportMoney();
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
			//id: s.id,
			slug: s.slug,
			life: s.life,
			status: s.status.value
		});
	}
	return res;
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
	if (ship.status.value !== "docked") return done(new Error("Ship not docked"));
	if (!ship.checkCargo(quantity)) return done(new Error("Not enough space in ship"));
	var cityId = ship.city;
	var user = this;
	map.getCity(cityId, function(err, res) {
		if (err) return done(new Error("City not valid"));
		var city = res;
		city.getPrice(product, quantity, function(err, price) {
			if (err) return done(err);
			price *= 1.2;
			if (user.money < price) return done(new Error("Not enough money"));
			user.money -= price;
			city.buyProduct(product, quantity, function(err, res) {
				if (err) {
					user.money += price;
					return done(err);
				}
				if (!ship.addProduct(product, quantity)) return done(new Error("BuyProduct fatal error"));
				user.reportMoney();
				return done();
			});
		});
	});
};
User.prototype.sellProduct = function(shipId, product, quantity, done) {
	var ship = this.getShip(shipId);
	var user = this;
	if (ship.status.value !== "docked") return done(new Error("Ship not docked"));
	if (ship.cargo[product] < quantity) return done(new Error("Not cargo in ship"));
	map.getCity(ship.city, function(err, res) {
		if (err) return done(new Error("City not valid"));
		var city = res;
		city.getPrice(product, quantity, function(err, price) {
			if (err) return done(err);
			price *= 0.8;
			user.money += price;
			city.sellProduct(product, quantity, function(err, res) {
				if (err) {
					user.money -= price;
					return done(err);
				}
				if (!ship.removeProduct(product, quantity)) return done(new Error("sellProduct: Fatal Error"));
				user.reportMoney();
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

User.prototype.reportMoney = function() {
	for (var s in this.sockets) {
		this.sockets[s].emit('money', this.money);
	}
};

module.exports = User;