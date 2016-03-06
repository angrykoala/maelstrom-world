/*
Name: City Test
Project: Maelström - World
Author: demiurgosoft <demiurgosoft@hotmail.com>
Description: Unit test for city
*/

var assert = require('chai').assert;


var City = require('../app/city');

describe('City', function() {
	it('New City', function() {
		var city = new City("MyCity", [2, 3]);
		assert.strictEqual(city.name, "MyCity");
		assert.strictEqual(city.position[0], 2);
		assert.strictEqual(city.position[1], 3);
	});
	it.skip('City Products', function() {
		throw new Error("not implemented");
	});
	it.skip('Buy/Sell', function() {
		throw new Error("not implemented");
	});
});