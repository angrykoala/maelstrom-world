/*
Name: User Test
Project: Maelström - World
Author: demiurgosoft <demiurgosoft@hotmail.com>
Description: Unit test for user
*/

var assert = require('chai').assert;


var User = require('../app/user');
var data = require('./config/data');
var ShipModel = require('../app/ship');
var config=require('../config/config');

describe('User', function() {
	var testUser;
	beforeEach(function() {
		testUser = new User("arthur");
		assert.ok(testUser);
	});

	it('New User', function() {
		var myUser = new User("myUser");
		assert.ok(myUser);
		assert.strictEqual(myUser.id, "myUser");
		assert.strictEqual(myUser.money, config.initialMoney);
		assert.ok(myUser.ships);
	});
	it('Get Ships', function() {
		var res = testUser.getAllShips();
		assert.strictEqual(res.length, 0);
		testUser.ships["black-pearl"] = {
			name: "Black Pearl",
			model: {
				name: "Galleon",
				modeldata: 12
			},
			owner: "arthur",
			slug: "black-pearl",
			life: 100,
			cargo: {
				bread: 12
			},
			status: {
				value: "Docked"
			}
		};
		res = testUser.getAllShips();
		assert.strictEqual(res.length, 1);
		var s = res[0];
		assert.propertyVal(s, "name", "Black Pearl");
		assert.propertyVal(s, "model", "Galleon");
		assert.notProperty(s, "owner");
		assert.propertyVal(s, "slug", "black-pearl");
		assert.propertyVal(s, "life", 100);
		assert.notProperty(s, "cargo");
		assert.propertyVal(s, "status", "Docked");

		res = testUser.getShip("black-pearl");
		assert.ok(res);
		assert.propertyVal(res, "name", "Black Pearl");
		assert.ok(res.model);
		assert.strictEqual(res.model.name, "Galleon");
		assert.ok(res.cargo);
		assert.strictEqual(res.cargo.bread, 12);
		assert.propertyVal(res, "owner", "arthur");

		res = testUser.getShip("black-foo");
		assert.notOk(res);
		res = testUser.getShip("Black Pearl");
		assert.notOk(res);
	});
	it('Build Ship', function(done) {
		var res = testUser.getAllShips();
		assert.strictEqual(res.length, 0);
		var model = new ShipModel("Galleon", data.ships.galleon);
		assert.ok(model);
		testUser.buildShip("TShip", model, "testcity", function(err, res) {
			assert.notOk(err);
			assert.ok(res);
			assert.ok(res.name);
			assert.strictEqual(res.name, "TShip");
			assert.strictEqual(testUser.money, config.initialMoney - model.price);
			var s = testUser.getAllShips();
			assert.strictEqual(s.length, 1);
			testUser.buildShip("TShip", model, "testcity", function(err, res) {
				assert.ok(err);
				testUser.buildShip("", model, "testcity", function(err, res) {
					assert.ok(err);
					var s = testUser.getAllShips();
					assert.strictEqual(s.length, 1);
					testUser.buildShip("TShip2", model, "testcity", function(err, res) {
						assert.notOk(err);
						assert.ok(res);
						assert.strictEqual(res.name, "TShip2");
						var s = testUser.getAllShips();
						assert.strictEqual(s.length, 2);
						assert.strictEqual(testUser.money, config.initialMoney - model.price * 2);
						model.price=20000;
						testUser.buildShip("TShip3", model, "testcity", function(err, res) {
							assert.ok(err);

							done();
						});
					});
				});
			});
		});
	});
	it.skip('Buy Product', function() {
		throw new Error("not implemented");
	});
	it.skip('Sell Product', function() {
		throw new Error("not implemented");
	});
	it('Move Ship', function(done) {
		var dummy_ship={
			name: "dummy",
			destiny: "dest",
			move: function(destiny, done){
				this.destiny=destiny;
				if(!destiny) return done("err");
				else return done();
			}
		};
		testUser.ships.dummy=dummy_ship;
		testUser.moveShip('dummy','cityTest',function(err){
			assert.notOk(err);
			assert.strictEqual(testUser.ships.dummy.destiny,'cityTest');
			testUser.moveShip('dummmy','',function(err){
				assert.ok(err);
				testUser.moveShip('notdummy','cityTest',function(err){
					assert.ok(err);
					done();
				});
			});
		});
	});
});
