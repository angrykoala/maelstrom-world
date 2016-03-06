/*
Name: Game Update
Project: Maelström - World
Author: demiurgosoft <demiurgosoft@hotmail.com>
Description: Update logic for game event loop
*/
var dbHandler = require('./dbhandler.js');
var config = require('../config/config.js');
var async = require('async');

var timer = null;


var GameUpdate = {
	beginLoop: function(time, tick) {
		var gu = this;
		if (!time || time < 0) time = config.refreshTime;
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
		//TODO
	},
	shipsUpdate: function(done) {
		//TODO
	}
};

module.exports = GameUpdate;
