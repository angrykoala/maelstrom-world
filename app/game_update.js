/*
Name: Game Update
Project: Maelström - World
Author: demiurgosoft <demiurgosoft@hotmail.com>
Description: Update logic for game event loop
*/
"use strict";

var config = require('../config/config.js');
var async = require('async');
var map = require('./map');
var userList = require('./world').users;
var worldBackup = require('./world').backup;

var timer = null;

var GameUpdate = {
	startLoop: function(time, io, tick) {
		var gu = this;
		var tickValue = 0;
		var backupTime = config.backupTime || 100;
		if (!time || time <= 0) time = config.refreshTime;
		timer = setInterval(function() {
			tickValue++;
			gu.cityProductsUpdate(function(err, res) {
				if (err) return tick(err, tickValue);
				gu.shipsUpdate(function(err, res) {
					return tick(err, tickValue);
				});
			});
			if (tickValue % backupTime === 0 && config.backup) worldBackup(function(err) {
				if (err) console.log(err);
			});
		}, time);
	},
	cancelLoop: function() {
		if (timer) clearInterval(timer);
		timer = null;
		worldBackup(function(err) {
			if (err) console.log(err);
		});
	},
	cityProductsUpdate: function(done) {
		map.updateCities(done);
	},
	shipsUpdate: function(done) {
		userList.updateShips(done);
	}
};

module.exports = GameUpdate;