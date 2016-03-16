/*
Name: Ship Test
Project: Maelström - World
Author: demiurgosoft <demiurgosoft@hotmail.com>
Description: Unit test for ship
*/

var assert = require('chai').assert;

var Ship = require('../app/ship');
var data=require('./config/data').ships;
var populate=require('./config/populate');

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


describe('Ship', function() {
	var testShip;
	var testModel=new Ship(data.galleon.name,data.galleon);
	beforeEach(function(done) {
		populate(function(){
			testShip = testModel.createShip("My Ship",{id:"arthur"}, "isengard");
			assert.ok(testShip);
			done();
		});
	});
	afterEach(function() {
		testShip=undefined;
		populate.clear();
	});
	after(function(){
		testModel=undefined;
	});
	
	it('New Ship', function() {
			var galleon=new Ship(data.galleon.name,data.galleon);
			var myShip = galleon.createShip("My Ship",{id:"arthur"}, "isengard");
			assert.ok(myShip);
			assert.strictEqual(myShip.name,'My Ship');
			assert.strictEqual(myShip.owner,'arthur');
			assert.strictEqual(myShip.model.name,galleon.name);
			assert.strictEqual(myShip.life,galleon.life);
			assert.strictEqual(myShip.city,"isengard");
			assert.strictEqual(myShip.status.value,"docked");
			assert.strictEqual(myShip.slug,'my-ship');
			assert.strictEqual(myShip.getCurrentCargo(),0);
			assert.ok(myShip.cargo);
	});
	it('Ship Products',function(){
		assert.strictEqual(testShip.getCurrentCargo(),0);
		assert.ok(testShip.addProduct("testProduct", 10));
		assert.strictEqual(testShip.getCurrentCargo(),10);
		assert.strictEqual(testShip.cargo.testProduct,10);
		assert.ok(testShip.addProduct("testProduct2", 10));
		assert.strictEqual(testShip.getCurrentCargo(),20);
		assert.strictEqual(testShip.cargo.testProduct,10);
		assert.strictEqual(testShip.cargo.testProduct2,10);
		assert.ok(testShip.addProduct("testProduct",1000));
		assert.strictEqual(testShip.getCurrentCargo(),1020);
		assert.strictEqual(testShip.cargo.testProduct,1010);
		assert.strictEqual(testShip.cargo.testProduct2,10);
		assert.notOk(testShip.addProduct("testProduct3",2000));
		assert.notOk(testShip.cargo.testProduct3);
		assert.strictEqual(testShip.getCurrentCargo(),1020);
		assert.notOk(testShip.addProduct("testProduct",181));
		assert.strictEqual(testShip.getCurrentCargo(),1020);
		assert.strictEqual(testShip.cargo.testProduct,1010);
		assert.strictEqual(testShip.cargo.testProduct2,10);
		assert.ok(testShip.addProduct("testProduct",180));
		assert.strictEqual(testShip.getCurrentCargo(),1200);
		assert.strictEqual(testShip.cargo.testProduct,1190);
		assert.strictEqual(testShip.cargo.testProduct2,10);
		
	});
	it.skip('Ship Move',function(){
		
	});
	it.skip('Ship Update',function(){
	});
});
