/*
Name: City
Project: Maelström - World
Author: demiurgosoft <demiurgosoft@hotmail.com>
Description: 
*/

var city = function(name, position,products) {
	if (name) this.name = name;
	if (position) this.position = [position[0], position[1]];
	this.products = products || {};
};
city.prototype.addProduct = function(productName, quantity, productionRate) {
	this.products[productName] = {
		"quantity": quantity,
		"production": production,
	};
};
city.prototype.sellProduct=function(productName,quantity,done){
	if(!productName || quantity<0) return done(new Error("Bad data"));
	var p=this.products[productName];
	if(!p) return done(new Error("Not product in city"));
	p.quantity+=quantity;	
	return done();
};
city.prototype.buyProduct=function(productName,quantity,done){
	if(!productName || quantity<0) return done(new Error("Bad data"));
	var p=this.products[productName];
	if(!p) return done(new Error("Not product in city"));
	if(p.quantity<quantity) return done(new Error("Not enough quantity"));
	p.quantity+=quantity;
	return done();	
};


module.exports = city;
