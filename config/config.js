//Game configuration
"use strict";

module.exports = {
	refreshTime: 1000, //1 seg
	buyRatio: 1.2,
	sellRatio: 0.8,
	initialMoney: 10000,
	backupTime: 10, //100 updates (100 seconds)
	backup: (process.env.BACKUP == "true") || false
};