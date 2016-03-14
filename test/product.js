/*
Name: Product Test
Project: Maelström - World
Author: demiurgosoft <demiurgosoft@hotmail.com>
Description: Unit test for product
*/

var assert = require('chai').assert;


var Product = require('../app/product');

describe('Product', function() {
	it('New Product', function() {
		var p=new Product("productName",18);
		var p2=new Product("prodName2",-14);
		var p3=new Product("prodName3",0);
		assert.ok(p);
		assert.property(p,"name");
		assert.property(p,"price");
		assert.instanceOf(p,Product);
		assert.strictEqual(p.name,"productName");
		assert.strictEqual(p.price,18);
		assert.ok(p2);
		assert.property(p2,"name");
		assert.property(p2,"price");
		assert.instanceOf(p2,Product);
		assert.strictEqual(p2.name,"prodName2");
		assert.strictEqual(p2.price,0);
		assert.ok(p3);
		assert.property(p3,"name");
		assert.property(p3,"price");
		assert.instanceOf(p3,Product);
		assert.strictEqual(p3.name,"prodName3");
		assert.strictEqual(p3.price,0);
	});
});
