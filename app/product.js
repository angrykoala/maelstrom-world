/*
Name: Product
Project: Maelström - World
Author: demiurgosoft <demiurgosoft@hotmail.com>
Description:
*/
"use strict";

var Utils = require('./utils');
var product = function(name, price) {
	this.name = name;
	this.price = price >= 0 ? price : 0;
	this.slug = Utils.slugify(name);
};

module.exports = product;