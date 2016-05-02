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
var World = require('../app/world');

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
			populate.clear();
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
		it('/city/products/:city_name', function(done) {
			map.getAllCities(function(err, cities) {
				assert.notOk(err);
				assert.ok(cities);
				async.each(cities, function(cityName, cb) {
					request(app)
						.get('/city/products/' + cityName)
						.expect('Content-Type', /json/)
						.expect(200)
						.end(function(err, res) {
							assert.notOk(err);
							assert.ok(res);
							var body = res.body;
							for (var p in data.products) {
								var pname = data.products[p].name;
								assert.ok(body[pname]);
								assert.strictEqual(body[pname].quantity, 10);
								assert.strictEqual(body[pname].production, 1);
							}
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
		it('/products',function(done){
			request(app)
				.get('/products')
				.expect('Content-Type', /json/)
				.expect(200)
				.end(function(err, res) {
					assert.notOk(err);
					assert.ok(res);
					assert.ok(res.body);
					assert.strictEqual(res.body.length,3);
					assert.ok(res.body[0]);
					done();
				});
		});
		it('/user/ships', function(done) {
			var token = data.users.arthur.token;
			request(app)
				.get('/user/ships')
				.set('Authorization', "Bearer " + token)
				.expect('Content-Type', /json/)
				.expect(200)
				.end(function(err, res) {
					assert.notOk(err);
					assert.ok(res);
					assert.ok(res.body);
					assert.strictEqual(res.body.length, 1);
					request(app)
						.get('/user/ships')
						.expect(401)
						.expect('Content-Type', /json/)
						.end(function(err, res) {
							assert.notOk(err);
							assert.ok(res.body);
							assert.ok(res.body.err);
							done();
						});
				});
		});
		it('user/ship/:ship_id', function(done) {
			var userData = data.users.arthur;
			var token = userData.token;
			var shipData = data.userShips.blackPearl;
			var modelData = data.ships.caravel;
			request(app)
				.get('/user/ships')
				.set('Authorization', "Bearer " + token)
				.expect('Content-Type', /json/)
				.expect(200)
				.end(function(err, res) {
					assert.notOk(err);
					assert.ok(res);
					assert.ok(res.body);
					assert.strictEqual(res.body.length, 1);
					var shipSlug = res.body[0].slug;
					request(app)
						.get('/user/ship/' + shipSlug)
						.set('Authorization', "Bearer " + token)
						.expect('Content-Type', /json/)
						.expect(200)
						.end(function(err, res) {
							assert.notOk(err);
							assert.ok(res);
							assert.ok(res.body);
							var ship = res.body;
							assert.strictEqual(ship.name, shipData.name);
							assert.strictEqual(ship.model.name, modelData.name);
							assert.strictEqual(ship.life, modelData.life);
							assert.strictEqual(ship.life, ship.model.life);
							assert.ok(ship.city);
							assert.ok(ship.status);
							assert.ok(ship.slug);
							request(app)
								.get('/user/ship/' + shipSlug)
								.expect('Content-Type', /json/)
								.expect(401)
								.end(function(err, res) {
									assert.ok(res.body);
									assert.ok(res.body.err);
									done();
								});
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
			serverTest.startServer(function() {
				app = serverTest.app;
				done();
			});
		});
		afterEach(function() {
			serverTest.stopServer();
			populate.clear();
		});
		it('/user/signup', function(done) {
			var userData = data.users.arthur;
			var token = userData.token;
			World.users.getUser(userData.id, function(err, res) {
				assert.ok(err);
				assert.notOk(res);
				request(app)
					.post('/user/signup')
					.set('Authorization', "Bearer " + token)
					.expect(201)
					.end(function(err, res) {
						assert.notOk(err);
						assert.ok(res.body);
						assert.strictEqual(res.body.id, userData.id);
						assert.strictEqual(res.body.money, 1000); //default money value
						World.users.getUser(userData.id, function(err, res) {
							assert.notOk(err);
							assert.ok(res);
							assert.strictEqual(res.id, userData.id);
							done();
						});
					});
			});
		});
	});
	describe('PUT Routes', function() {
		var app;
		beforeEach(function(done) {
			var app;
			before(function(done) {
				populate(function() {
					serverTest.startServer(function() {
						app = serverTest.app;
						done();
					});
				});
			});
		});
		afterEach(function() {
			serverTest.stopServer();
			populate.clear();
		});
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
