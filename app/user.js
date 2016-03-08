/*
Name: User
Project: Maelström - World
Author: demiurgosoft <demiurgosoft@hotmail.com>
Description: 
*/

var User = function(id) {
	this.id = id;
	this.ships = {};
	this.money = 0;
};
User.prototype.buildShip = function(name, model, city, done) {
	if (this.ships[name] === undefined) {
		if (this.money > model.price) this.money -= model.price;
		else return done(new Error("Not enough money"));
		var ship = model.createShip(name, this, city);
		this.ships[name] = ship;
		return done(null, this.ships[name]);
	} else return done(new Error("Ship already exists"));
};
User.prototype.getAllShips = function() {
	return Object.keys(this.ships);
};
User.prototype.getShip = function(shipName) {
	return this.ships[shipName];
};
User.prototype.updateShips = function() {
	for (var i in this.ships) {
		if (!this.ships.hasOwnProperty(i)) continue;
		this.ships[i].update();
	}
};
module.exports = User;