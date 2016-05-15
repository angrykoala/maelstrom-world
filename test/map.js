/*
Name: Map Test
Project: Maelström - World
Author: demiurgosoft <demiurgosoft@hotmail.com>
Description: Unit test for map
*/

var assert = require('chai').assert;


var Map = require('../app/map');
var cities = require('./config/data').cities;
var City = require('../app/city');

describe('Map', function() {
	afterEach(function() {
		Map.clear();
	});
	it('Add & Get cities', function(done) {
		var c = cities.isengard;
		var cityTest = new City(c.name, [c.positionX, c.positionY]);
		Map.getAllCities(function(err, res) {
			assert.notOk(err);
			assert.strictEqual(res.length, 0);
			Map.addCity(cityTest);
			Map.addCity({
				a: "foo"
			});
			Map.getAllCities(function(err, res) {
				assert.notOk(err);
				assert.strictEqual(res.length, 1);
				assert.strictEqual(res[0], 'isengard');
				Map.addCity(cityTest);
				Map.getAllCities(function(err, res) {
					assert.notOk(err);
					assert.strictEqual(res.length, 1);
					Map.getCity('isengard', function(err, res) {
						assert.notOk(err);
						assert.ok(res);
						assert.strictEqual(res.name, "Isengard");
						Map.getCity('foo', function(err, res) {
							assert.ok(err);
							done();
						});
					});
				});
			});
		});
	});
	it('Get Distance', function(done) {
		var c1 = cities.isengard;
		var c2 = cities.minasTirith;
		var city1 = new City(c1.name, [c1.positionX, c1.positionY]);
		var city2 = new City(c2.name, [c2.positionX, c2.positionY]);
		assert.ok(city1);
		assert.ok(city2);
		Map.addCity(city1);
		Map.addCity(city2);
		Map.getAllCities(function(err, res) {
			assert.notOk(err);
			assert.ok(res.length, 2);
			var allCities = res;
			Map.getDistance(allCities[0], allCities[1], function(err, res) {
				assert.notOk(err);
				assert.closeTo(res, 299.87, 0.01);
				Map.getDistance(allCities[1], allCities[0], function(err, res) {
					assert.notOk(err);
					assert.closeTo(res, 299.87, 0.01);
					Map.getDistance("foo", city2, function(err, res) {
						assert.ok(err);
						Map.getDistance(allCities[0], allCities[0], function(err, res) {
							assert.notOk(err);
							assert.equal(res, 0);
							Map.getDistance({}, null, function(err, res) {
								assert.ok(err);
								done();
							});
						});
					});
				});
			});
		});
	});
});