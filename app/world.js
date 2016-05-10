/*
Name: World
Project: Maelström - World
Author: demiurgosoft <demiurgosoft@hotmail.com>
Description: Game World, defining all necessary elements
*/


var User = require('./user');
var map = require('./map');
var ws = require('./websockets');
var dbBackup = require('./database').backup;

var Products = {
	list: {},
	addProduct: function(product) {
		if (product && product.name) {
			this.list[product.slug] = product;
		}
	},
	getProduct: function(name) {
		return this.list[name] || null;
	},
	getProductList: function() {
		return Object.keys(this.list);
	}
};

var Users = {
	users: {
		arthur: new User("arthur")
	},
	getUser: function(id, done) {
		var res = this.users[id];
		if (!res) {
			console.log("User " + id + " not found, creating new one");
			this.addUser(id, function(err, res) {
				if (err) return done(new Error(err));
				return done(null, res);
			});
			//return done(new Error("Not user"));
		} else return done(null, res);
	},
	addUser: function(id, done) {
		if (this.users[id]) return done(new Error("User already exists"));
		else {
			this.users[id] = new User(id);
			res = this.users[id];
			return done(null, res);
		}
	},
	updateShips: function(done) {
		for (var i in this.users) {
			if (!this.users.hasOwnProperty(i)) continue;
			this.users[i].updateShips();
		}
		done(null);
	},
	backup: function(done) {
		var l = [];
		for (var k in this.users) {
			var u = this.users[k];
			var ships = [];
			for (var s in u.ships)
				ships.push(u.ships[s].toJSON());

			l.push({
				id: u.id,
				ships: ships,
				money: u.money
			});
		}
		dbBackup("users", l, function(err) {
			return done(err);

		});
	}

};

var Ships = {
	list: {},
	addShip: function(model) {
		if (model && model.name) {
			this.list[model.slug] = model;
		}
	},
	getShip: function(name) {
		return this.list[name] || null;
	},
	getShipList: function(done) {
		var res = [];
		var l = this.list;
		for (var k in l) {
			if (l.hasOwnProperty(k)) {
				res.push(l[k]);
			}
		}
		return done(null, res);
	}
};

function setSockets(io, done) {
	io.on('connection', function(socket) {
		Users.getUser(socket.decoded_token.id, function(err, res) {
			if (!err) {
				res.addSocket(socket);
			}
		});
	});
	done(null);
}

function backup(done) {
	var err1;
	map.backup(function(err) {
		err1 = err;
		Users.backup(function(err) {
			if (err || err1) return done(new Error("Backup Error:" + err1 + "    " + err2));
			return done(null);
		});
	});
}

module.exports.products = Products;
module.exports.ships = Ships;
module.exports.users = Users;
module.exports.map = map;
module.exports.setSockets = setSockets;
module.exports.backup = backup;