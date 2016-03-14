/*
Name: Ship Test
Project: Maelström - World
Author: demiurgosoft <demiurgosoft@hotmail.com>
Description: Unit test for ship
*/

var assert = require('chai').assert;

var Ship = require('../app/ship');
var data=require('./config/data').ships;

describe('Ship Model', function() {
	it('New Ship Model', function() {
		var defaultModel=new Ship("Default");
		assert.ok(defaultModel);
		assert.instanceOf(defaultModel,Ship);
		assert.strictEqual(defaultModel.name,"Default");
		assert.strictEqual(defaultModel.slug,"default");
		assert.strictEqual(defaultModel.life,0);
		assert.strictEqual(defaultModel.speed,0);
		assert.strictEqual(defaultModel.speed,0);
		assert.strictEqual(defaultModel.price,0);
		assert.strictEqual(defaultModel.cargo,0);
		var galleon=new Ship(data.galleon.name,data.galleon);
		assert.ok(galleon);
		assert.instanceOf(galleon,Ship);
		assert.strictEqual(galleon.name,"Galleon");
		assert.strictEqual(galleon.slug,"galleon");
		assert.strictEqual(galleon.life,data.galleon.life);
		assert.strictEqual(galleon.speed,data.galleon.speed);
		assert.strictEqual(galleon.speed,data.galleon.speed);
		assert.strictEqual(galleon.price,data.galleon.price);
		assert.strictEqual(galleon.cargo,data.galleon.cargo);
	});
});


describe.skip('Ship', function() {
	it.skip('New Ship', function() {
		throw new Error("not implemented");	
	});
});
