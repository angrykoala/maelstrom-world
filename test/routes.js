/*
Name: Routes Test
Project: Maelström - World
Author: demiurgosoft <demiurgosoft@hotmail.com>
Description: Routes test
*/

var assert = require('chai').assert;

describe('Routes', function() {
	describe('GET Routes', function() {
		it.skip('/map', function() {
			throw new Error("not implemented");
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
});