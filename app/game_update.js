/*
Name: Game Update
Project: Maelström - World
Author: demiurgosoft <demiurgosoft@hotmail.com>
Description: Update logic for game event loop
*/
var config = require('../config/config.js');
var async = require('async');
var map = require('./map');
var userList = require('./world').users;

var timer = null;

var GameUpdate = {
	startLoop: function(time, tick) {
		var gu = this;
		if (!time || time <= 0) time = config.refreshTime;
		timer = setInterval(function() {
			gu.cityProductsUpdate(function(err, res) {
				if (err) return tick(err);
				gu.shipsUpdate(function(err, res) {
					return tick(err);
				});
			});
		}, time);
	},
	cancelLoop: function() {
		if (timer) clearInterval(timer);
		timer = null;
	},
	cityProductsUpdate: function(done) {
		map.updateCities(done);
	},
	shipsUpdate: function(done) {
		userList.updateShips(done);
	}
};

module.exports = GameUpdate;
