/*
Name: Routes Test
Project: Maelström - World
Author: demiurgosoft <demiurgosoft@hotmail.com>
Description: Routes test
*/

var assert = require('chai').assert;
var request = require('supertest');

var map = require('../app/map');

var serverTest = require('./config/server');
var populate = require('./config/populate');
var data = require('./config/data');

describe('Routes', function() {
	describe('GET Routes', function() {
		var app;
		before(function(done) {
			populate(done);
			serverTest.startServer();
			app = serverTest.app;
		});
		it('/map', function(done) {
			request(app)
				.get('/map')
				.expect('Content-Type', /json/)
				.expect(200)
				.end(function(err, res) {
					assert.notOk(err);
					assert.ok(res);
					assert.isArray(res.body);
					var body = res.body;
					assert.equal(body.length, Object.keys(data.cities).length);
					for (var i = 0; i < body.length; i++) {
						assert.ok(body[i]);
						assert.ok(map.isCity(body[i]));
					}
					done();
				});
		});
	});
	it.skip('/city/:city_name', function() {
		throw new Error("not implemented");
	});
	it.skip('/ship_models', function() {
		throw new Error("not implemented");
	});
	it.skip('/user/ships', function() {
		throw new Error("not implemented");
	});
	it.skip('/user/data', function() {
		throw new Error("not implemented");
	});
});

describe('POST Routes', function() {
	it.skip('/user/signup', function() {
		throw new Error("not implemented");
	});
});
describe('PUT Routes', function() {
	it.skip('/user/build/ship', function() {
		throw new Error("not implemented");
	});
	it.skip('/user/move/ship', function() {
		throw new Error("not implemented");
	});
	it.skip('/user/buy', function() {
		throw new Error("not implemented");
	});
	it.skip('/user/sell', function() {
		throw new Error("not implemented");
	});
});
