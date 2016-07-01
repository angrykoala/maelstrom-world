/*
Name: Routes
Project: Maelström - World
Author: demiurgosoft <demiurgosoft@hotmail.com>
Description: api for world interaction
*/
"use strict";

var jwt = require('jsonwebtoken');
var expressjwt = require('express-jwt');
var bodyParser = require('body-parser');

var City = require('./city');
var User = require('./user');
var Product = require('./product');
var ShipModel = require('./ship');
var World = require('./world');

var serverConfig = require('../config/server');

module.exports = function(app) {

	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({
		extended: true
	}));

	//all urls under user can only be accesed having a jwt in the header
	//auth header must be: Bearer (jwt token)
	app.use('/user/*', expressjwt({
		secret: serverConfig.secret,
		credentialsRequired: true
	}));
	//middleware to return status 401 if jwt is not valid
	app.use(function(err, req, res, next) {
		if (err.name === 'UnauthorizedError') res.status(401).json({
			error: "invalid token"
		});
	});

	//CORS
	app.use('/', function(req, res, next) {
		res.setHeader('Access-Control-Allow-Origin', '*');
		res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE');
		res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
		res.setHeader('Access-Control-Allow-Credentials', true);
		next();
	});

	app.get('/', function(req, res) {
		res.send("maelstrom-world API - version " + process.env.npm_package_version);
	});
	app.get('/map', function(req, response) {
		World.map.getAllCities(function(err, res) {
			if (err) return response.status(500).json({
				error: err.toString()
			});
			else return response.status(200).json(res);
		});
	});
	app.get('/city/:city_name', function(req, response) {
		var cityName = req.params.city_name;
		World.map.getCity(cityName, function(err, res) {
			if (err) return response.status(500).json({
				error: err.toString()
			});
			else return response.status(200).json(res);
		});
	});
	app.get('/city/products/:city_name', function(req, response) {
		var cityName = req.params.city_name;
		World.map.getCity(cityName, function(err, res) {
			if (err) return response.status(500).json({
				error: err.toString()
			});
			else {
				res.getProductsPrice(function(err, res) {
					if (err) return response.status(500).json({
						error: err.toString()
					});
					else return response.status(200).json(res);

				});
			}
		});
	});
	app.get('/ship_models', function(req, response) {
		World.ships.getShipList(function(err, res) {
			if (err) return response.status(500).json({
				error: err.toString()
			});
			else return response.status(200).json(res);
		});
	});
	app.get('/products', function(req, response) {
		return response.status(200).json(World.products.getProductList());
	});
	app.get('/user/ships', function(req, response) {
		var userId = req.user.id;
		World.users.getUser(userId, function(err, res) {
			if (err) return response.status(500).json({
				error: err.toString()
			});
			else return response.status(200).json(res.getAllShips());
		});
	});
	app.get('/user/ship/:ship_id', function(req, response) {
		var userId = req.user.id;
		var shipId = req.params.ship_id;
		World.users.getUser(userId, function(err, res) {
			if (err) return response.status(500).json({
				error: err.toString()
			});
			else return response.status(200).json(res.getShip(shipId).toJSON());
		});
	});
	app.get('/user/data', function(req, response) {
		var userId = req.user.id;
		World.users.getUser(userId, function(err, res) {
			if (err) return response.status(500).json({
				error: err.toString()
			});
			else {
				var resp = {
					"id": res.id,
					"money": res.money
				};
				return response.status(200).json(resp);
			}
		});
	});
	app.post('/user/signup', function(req, response) {
		var userId = req.user.id;
		World.users.addUser(userId, function(err, res) {
			if (err) return response.status(500).json({
				error: err.toString()
			});
			else {
				return response.status(201).json({
					id: res.id,
					money: res.money
				});
			}
		});
	});
	app.put('/user/build/ship', function(req, response) {
		var userId = req.user.id;
		var shipModelId = req.body.model;
		var shipName = req.body.ship_name;
		var cityId = req.body.city;
		if (shipModelId === undefined || !shipName || cityId === undefined || !userId) return response.status(500).json({
			error: "Not valid data"
		});
		World.users.getUser(userId, function(err, user) {
			if (err) return response.status(500).json({
				error: err.toString()
			});
			else {
				var model = World.ships.getShip(shipModelId);
				if (!model) return response.status(500).json({
					error: "No shipModel found"
				});
				if (!World.map.isCity(cityId)) return response.status(500).json({
					error: "City doesn't exist"
				});
				user.buildShip(shipName, model, cityId, function(err, res) {
					if (err) return response.status(500).json({
						error: err.toString()
					});
					else return response.status(201).json(res.toJSON());
				});
			}
		});
	});
	app.put('/user/move/ship', function(req, response) {
		var userId = req.user.id;
		var shipId = req.body.ship;
		var cityId = req.body.city;
		if (shipId === undefined || cityId === undefined) return response.status(500).json({
			error: "Not valid data"
		});
		World.users.getUser(userId, function(err, res) {
			if (err) return response.status(500).json({
				error: err.toString()
			});
			res.moveShip(shipId, cityId, function(err, res) {
				if (err) return response.status(500).json({
					error: err.toString()
				});
				return response.status(200).json({
					status: "OK"
				});
			});
		});
	});
	app.put('/user/buy', function(req, response) {
		var userId = req.user.id;
		var shipId = req.body.ship;
		var productId = req.body.product;
		var quantity = parseInt(req.body.quantity, 10);
		if (shipId === undefined || userId === undefined || productId === undefined || quantity === undefined) return response.status(400).json({
			error: "Not valid data",
			data: req.body,
			expected: ["shipId", "userId", "productId", "quantity"]
		});
		World.users.getUser(userId, function(err, res) {
			if (err) return response.status(500).json({
				error: "Not user found",
				user: userId
			});
			var user = res;
			user.buyProduct(shipId, productId, quantity, function(err) {
				if (err) return response.status(500).json({
					error: err
				});
				return response.status(200).json({
					status: "OK",
					statusCode: 200
				});
			});
		});
	});
	app.put('/user/sell', function(req, response) {
		var userId = req.user.id;
		var shipId = req.body.ship;
		var productId = req.body.product;
		var quantity = parseInt(req.body.quantity, 10);
		if (shipId === undefined || userId === undefined || productId === undefined || quantity === undefined) return response.status(400).json({
			error: "Not valid data"
		});
		World.users.getUser(userId, function(err, res) {
			if (err) return response.status(500).json({
				error: "Not user found"
			});
			var user = res;
			user.sellProduct(shipId, productId, quantity, function(err) {
				if (err) return response.status(500).json({
					error: err
				});
				return response.status(200).json({
					status: "OK",
					statusCode: 200
				});
			});
		});
	});
};