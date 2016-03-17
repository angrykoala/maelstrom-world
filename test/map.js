/*
Name: Map Test
Project: Maelström - World
Author: demiurgosoft <demiurgosoft@hotmail.com>
Description: Unit test for map
*/

var assert = require('chai').assert;


var Map = require('../app/map');
var cities = require('./config/data').cities;

describe('Map', function() {
	it('Add & Get cities', function(done) {
		var cityTest = cities.isengard;
		Map.getAllCities(function(err, res) {
			assert.notOk(err);
			assert.strictEqual(res.length, 0);
			Map.addCity(cityTest);
			Map.getAllCities(function(err, res) {
				assert.notOk(err);
				assert.strictEqual(res.length, 1);
				assert.strictEqual(res[0], 'isengard');
				Map.addCity(cityTest);
				Map.getAllCities(function(err, res) {
					assert.notOk(err);
					assert.strictEqual(res.length, 1);
					done();
				});
			});
		});
	});
	it.skip('Get Distance', function() {
		throw new Error("not implemented");
	});
});
