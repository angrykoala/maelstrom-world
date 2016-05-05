/*
Name: City Test
Project: Maelström - World
Author: demiurgosoft <demiurgosoft@hotmail.com>
Description: Unit test for city
*/

var assert = require('chai').assert;

var City = require('../app/city');
var populate = require('./config/populate');

describe('City', function() {
	var testCity;
	before(function(done) {
		populate(done);
	});

	beforeEach(function() {
		testCity = new City("TestCity", [2, 4]);
		assert.ok(testCity);
	});
	afterEach(function() {
		testCity = undefined;
	});

	it('New City', function() {
		var city = new City("My City", [2, 3]);
		assert.strictEqual(city.name, "My City");
		assert.strictEqual(city.position[0], 2);
		assert.strictEqual(city.position[1], 3);
		assert.strictEqual(city.slug, "my-city");
	});

	it('City Products', function(done) {
		testCity.addProduct("Bread", 10, 4);
		assert.ok(testCity.products.Bread);
		assert.strictEqual(testCity.products.Bread.quantity, 10);
		assert.strictEqual(testCity.products.Bread.production, 4);
		testCity.addProduct("Bread", 20, 2);
		assert.strictEqual(testCity.products.Bread.quantity, 20);
		assert.strictEqual(testCity.products.Bread.production, 2);
		testCity.addProduct("stone", 10, -2);
		assert.strictEqual(testCity.products.stone.quantity, 10);
		assert.strictEqual(testCity.products.stone.production, -2);
		testCity.getProducts(function(err, res) {
			assert.notOk(err);
			assert.ok(res);
			assert.ok(res.Bread);
			assert.ok(res.stone);
			assert.strictEqual(res.Bread.quantity, 20);
			assert.strictEqual(res.Bread.production, 2);
			assert.strictEqual(res.stone.quantity, 10);
			assert.strictEqual(res.stone.production, -2);
			assert.strictEqual(Object.keys(res).length, 2);
			testCity.getPrice("Bread", 10, function(err, res) {
				assert.notOk(err);
				assert.strictEqual(res, 900);
				testCity.getPrice("Bad Product", 10, function(err, res) {
					assert.ok(err);
					testCity.getPrice("Bread", -10, function(err, res) {
						assert.ok(err);
						done();
					});
				});
			});
		});
	});
	it('Sell Product', function(done) {
		testCity.addProduct("Bread", 10, 4);
		assert.ok(testCity.products.Bread);
		assert.strictEqual(testCity.products.Bread.quantity, 10);
		testCity.sellProduct("Bread", 5, function(err) {
			assert.notOk(err);
			assert.strictEqual(testCity.products.Bread.quantity, 15);
			testCity.sellProduct("bad_bread", 10, function(err) {
				assert.ok(err);
				assert.strictEqual(testCity.products.Bread.quantity, 15);
				testCity.sellProduct("", -2, function(err) {
					assert.ok(err);
					done();
				});
			});
		});
	});
	it("Buy Product", function(done) {
		testCity.addProduct("Bread", 10, 4);
		assert.ok(testCity.products.Bread);
		assert.strictEqual(testCity.products.Bread.quantity, 10);
		testCity.buyProduct("Bread", 5, function(err) {
			assert.notOk(err);
			assert.strictEqual(testCity.products.Bread.quantity, 5);
			testCity.buyProduct("bad_bread", 10, function(err) {
				assert.ok(err);
				testCity.buyProduct("", -2, function(err) {
					assert.ok(err);
					assert.strictEqual(testCity.products.Bread.quantity, 5);
					testCity.buyProduct("Bread", 6, function(err) {
						assert.ok(err);
						assert.strictEqual(testCity.products.Bread.quantity, 5);
						testCity.buyProduct("Bread", 5, function(err) {
							assert.notOk(err);
							assert.strictEqual(testCity.products.Bread.quantity, 0);
							done();
						});
					});
				});
			});
		});
	});
});