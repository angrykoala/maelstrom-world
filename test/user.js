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
	beforeEach(function(){
		testUser=new User("arthur");
		assert.ok(testUser);
	});
	
	
	it('New User', function() {
		var myUser=new User("myUser");
		assert.ok(myUser);
		assert.strictEqual(myUser.id,"myUser");
		assert.strictEqual(myUser.money,1000);
		assert.ok(myUser.ships);
	});
	it.skip('Get Ships', function() {
		throw new Error("not implemented");
	});
	it.skip('Build Ship', function() {
		throw new Error("not implemented");
	});
	it.skip('Buy Product',function(){
		throw new Error("not implemented");
	});
	it.skip('Sell Product',function(){
		throw new Error("not implemented");
	});
	it.skip('Move Ship',function(){
		throw new Error("not implemented");
	});
});
