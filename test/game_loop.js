/*
Name: Test Game Loop
Project: Maelström - World
Author: demiurgosoft <demiurgosoft@hotmail.com>
Description:
*/

var assert = require('chai').assert;
var async = require('async');

var serverTest = require('./config/server');
var populate = require('./config/populate');
var data = require('./config/data');
var map = require('../app/map');
var gu = serverTest.gu;


describe('Game Loop', function() {
	//var app;
	beforeEach(function(done) {
		populate(function() {
			serverTest.startServer(function() {
				//app = serverTest.app;
				done();
			});
		});
	});
	afterEach(function() {
		serverTest.stopServer();
		populate.clear();
	});
	it('Update products', function(done) {
		this.timeout(3000);
		var ticks = 0;
		map.getAllCities(function(err, res) {
			assert.notOk(err);
			assert.ok(res);
			var cityId = res[0];
			var city = map.cities[cityId];
			assert.ok(city);
			city.getProducts(function(err, res) {
				assert.notOk(err);
				assert.ok(res);
				var key = Object.keys(res)[0];
				assert.ok(res);
				assert.ok(key);
				var cityProducts = res;
				var origQuantity = cityProducts[key].quantity;
				var origProd = cityProducts[key].production;
				gu.startLoop(120, function(err, tickValue) {
					assert.notOk(err);
					assert.strictEqual(ticks, tickValue);
					assert.isBelow(ticks, 6);
					if (ticks >= 5) {
						gu.cancelLoop();
						done();
					}
					assert.strictEqual(cityProducts[key].quantity, origQuantity + (origProd * (ticks + 1)));
					assert.strictEqual(cityProducts[key].production, origProd);
					ticks++;
				});
			});
		});
	});
	it.skip('Update ships', function(done) {
		var ticks = 0;


	});
});
