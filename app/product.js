/*
Name: Product
Project: Maelström - World
Author: demiurgosoft <demiurgosoft@hotmail.com>
Description: 
*/
var product = function(name, price) {
	this.name = name;
	this.price = price >= 0 ? price : 0;
};

module.exports = product;
