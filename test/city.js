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
		var city = new City("My City", [2, 3]);
		assert.strictEqual(city.name, "My City");
		assert.strictEqual(city.position[0], 2);
		assert.strictEqual(city.position[1], 3);
		assert.strictEqual(city.slug, "my-city");
	});
	it.skip('City Products', function() {
		throw new Error("not implemented");
	});
	it.skip('Buy/Sell', function() {
		throw new Error("not implemented");
	});
});