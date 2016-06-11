"use strict";

var MongoClient = require('mongodb').MongoClient;

// Connection URL
var url = require('../config/database').url;


module.exports = {
	backup: function(name, list, done) {
		var nameback = name + "Back";
		MongoClient.connect(url, function(err, db) {
			if (err) return done(err);
			db.collection(nameback).insert({}, function(err, res) {
				if (err) {
					db.close();
					return done(err);
				}
				db.collection(nameback).drop(function(err, res) {
					if (err) {
						db.close();
						return done(err);
					}
					db.collection(name).rename(nameback, function(err, res) {
						if (err) console.log("Rename: " + err);
						/*if (err) {
						    db.close();
						    return done(err);
						}*/
						db.collection(name).insert(list, function(err, res) {
							db.close();
							return done(err);
						});
					});
				});
			});
		});
	},
	restore: function(name, done) {
		MongoClient.connect(url, function(err, db) {
			if (err) return done(err);
			db.collection(name).find().toArray(function(err, res) {
				return done(err, res);
			});
		});
	}
};
