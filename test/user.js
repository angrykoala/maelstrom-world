/*
Name: User Test
Project: Maelström - World
Author: demiurgosoft <demiurgosoft@hotmail.com>
Description: Unit test for user
*/

var assert = require('chai').assert;


var User = require('../app/user');
var data = require('./config/data');

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
		assert.strictEqual(myUser.money, 1000);
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
	it.skip('Build Ship', function() {
		throw new Error("not implemented");
	});
	it.skip('Buy Product', function() {
		throw new Error("not implemented");
	});
	it.skip('Sell Product', function() {
		throw new Error("not implemented");
	});
	it.skip('Move Ship', function() {
		throw new Error("not implemented");
	});
});