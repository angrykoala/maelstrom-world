/*
Name: Routes Test
Project: Maelström - World
Author: demiurgosoft <demiurgosoft@hotmail.com>
Description: Routes test
*/

var assert = require('chai').assert;
var request = require('supertest');
var async = require('async');

var map = require('../app/map');

var serverTest = require('./config/server');
var populate = require('./config/populate');
var data = require('./config/data');

describe('Routes', function() {
	describe('GET Routes', function() {
		var app;
		before(function(done) {
			populate(function() {
				serverTest.startServer(function() {
					app = serverTest.app;
					done();
				});
			});
		});
		after(function() {
			serverTest.stopServer();
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
		it('/city/:city_name', function(done) {
			map.getAllCities(function(err, cities) {
				assert.notOk(err);
				assert.ok(cities);
				async.each(cities, function(cityName, cb) {
					request(app)
						.get('/city/' + cityName)
						.expect('Content-Type', /json/)
						.expect(200)
						.end(function(err, res) {
							assert.notOk(err);
							assert.ok(res);
							var body = res.body;
							assert.ok(body.name);
							assert.ok(body.position);
							assert.strictEqual(body.position.length, 2);
							assert.ok(body.slug);
							cb();
						});
				}, function(err) {
					assert.notOk(err);
					done();
				});
			});
		});
		it('/ship_models', function(done) {
			request(app)
				.get('/ship_models')
				.expect('Content-Type', /json/)
				.expect(200)
				.end(function(err, res) {
					assert.notOk(err);
					assert.ok(res.body);
					var body = res.body;
					assert.typeOf(body, 'array');
					for (var i = 0; i < body.length; i++) {
						var s = body[i];
						assert.ok(s.name);
						assert.ok(s.life);
						assert.ok(s.speed);
						assert.ok(s.price);
						assert.ok(s.cargo);
						assert.ok(s.slug);
					}
					done();
				});
		});
		it('/user/ships', function(done) {
			var token = data.users.arthur.token;
			request(app)
				.get('/user/ships')
				.set('Authorization', "Bearer " + token)
				.expect(200)
				.end(function(err, res) {
					assert.notOk(err);
					assert.ok(res);
					assert.ok(res.body);
					assert.strictEqual(res.body.length, 1);
					request(app)
						.get('/user/ships')
						.expect(401)
						.end(function(err, res) {
							assert.notOk(err);
							assert.ok(res.body);
							assert.ok(res.body.err);
							done();
						});
				});
		});
		it('/user/data', function(done) {
			var userData = data.users.arthur;
			var token = userData.token;
			request(app)
				.get('/user/data')
				.set('Authorization', "Bearer " + token)
				.expect(200)
				.end(function(err, res) {
					assert.notOk(err);
					assert.ok(res);
					assert.ok(res.body);
					assert.strictEqual(res.body.id, userData.id);
					assert.isNumber(res.body.money);
					request(app)
						.get('/user/data')
						.expect(401)
						.end(function(err, res) {
							assert.notOk(err);
							assert.ok(res.body);
							assert.ok(res.body.err);
							done();
						});
				});
		});
	});
	describe('POST Routes', function() {
		var app;
		beforeEach(function(done) {
			populate(function() {
				serverTest.startServer(function() {
					app = serverTest.app;
					done();
				});
			});
		});
		afterEach(function() {
			serverTest.stopServer();
		});
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
});
