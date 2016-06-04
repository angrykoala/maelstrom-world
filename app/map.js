/*
Name: Map
Project: Maelström - World
Author: demiurgosoft <demiurgosoft@hotmail.com>
Description:
*/

var utils = require('./utils');
var dbHandler = require('./database');

var io;
var map = {
	cities: {},
	addCity: function(city) {
		if (city && city.name) {
			city.slug = utils.slugify(city.name);
			this.cities[city.slug] = city;
		}
	},
	getCity: function(name, done) {
		var c = this.cities[name];
		if (!c) return done(new Error("No city found"));
		return done(null, c);
	},
	getAllCities: function(done) {
		var res = [];
		var l = this.cities;
		for (var k in l) {
			if (l.hasOwnProperty(k)) {
				var c=l[k];
				res.push({name:c.name,slug:c.slug,position:c.position});
			}
		}
		return done(null, res);
		//return done(null, Object.keys(this.cities));
	},
	isCity: function(name) {
		if (this.cities[name]) return true;
		else return false;
	},
	updateCities: function(done) {
		for (var i in this.cities) {
			this.cities[i].update();
			var price=this.cities[i].getProductsPrice(function(err,res){
				if(err) console.log(err);
				else io.to(i).emit('city-update',{city:i,products:res});
			});
		}
		done(null);
	},
	getDistance: function(city1, city2, done) {
		if (!city1 || !city2) return done(new Error("Invalid values"));
		var c1 = this.cities[city1];
		var c2 = this.cities[city2];
		if (!c1 || !c2) return done(new Error("Invalid cities"));
		var pos1 = c1.position;
		var pos2 = c2.position;
		if (!pos1 || !pos2) return done(new Error("Invalid positions"));
		var dx = pos1[0] - pos2[0];
		var dy = pos1[1] - pos2[1];

		var distance = Math.sqrt(dx * dx + dy * dy);
		if (distance >= 0) return done(null, distance);
		else return done(new Error("Error in distance"));

	},
	clear: function() {
		this.cities = {};
	},
	backup: function(done) {
		var l = [];
		for (var k in this.cities) {
			l.push(this.cities[k]);
		}
		dbHandler.backup("map", l, function(err) {
			return done(err);

		});
	},
	restore: function(done) {
		var cities = this.cities;
		dbHandler.restore("map", function(err, res) {
			if (err) return done(err);
			for (var i = 0; i < res.length; i++) {
				if (!cities[res[i].slug]) console.log("City not found" + res[i].slug);
				else {
					cities[res[i].slug].products = res[i].products;
				}
			}
		});
		return done();
	},
	setSockets: function(socketHandler,done){
		io=socketHandler;
		done();
	}
};

module.exports = map;
