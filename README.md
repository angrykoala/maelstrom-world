Maelström - World
=================
_by @demiurgosoft_     
[![Build Status](https://travis-ci.org/demiurgosoft/maelstrom-world.svg?branch=master)](https://travis-ci.org/demiurgosoft/maelstrom-world)
[![Coverage Status](https://coveralls.io/repos/github/demiurgosoft/maelstrom-world/badge.svg?branch=master)](https://coveralls.io/github/demiurgosoft/maelstrom-world?branch=master)
[![Dependency Status](https://gemnasium.com/demiurgosoft/maelstrom-world.svg)](https://gemnasium.com/demiurgosoft/maelstrom-world)
[![Code Climate](https://codeclimate.com/github/demiurgosoft/maelstrom-world/badges/gpa.svg)](https://codeclimate.com/github/demiurgosoft/maelstrom-world)

![Maelström Logo](https://raw.githubusercontent.com/demiurgosoft/maelstrom/master/logo/logo.jpg)

Game server to handle maelstrom dynamic world and game logic

## Geting Started
1. To install the service and necessary dependencies: `npm install --production`
	1. If you want also the dev-dependencies (for testing and development of Mäelstrom-world): `npm install`
	2. To test the service using mocha: `npm test`
2. To start the service: `npm start`

## API REST
The actions are performed through a RESTful API with plain http request and json responses:

|Method|URL         |Usage   |
|:----:|:----------:|:-------|
|GET   |`/map`|Returns an array of all cities, code 200 if success|
|GET   |`/city/:city_name`|Returns the given city information, code 200|
|GET   |`/city/products/:city_name`|Returns a list of the given city products with code 200|
|GET   |`/ship_models`|Returns the list of ship models, code 200|
|GET   |`/products`|Returns the full list of products on the game and basic prices with code 200|
|GET   |`/user/ships`|Returns the full list of ships of the authenticated user, code 200|
|GET   |`/user/ship/:ship_id`|Returns the full information of given ship of the authenticated user `{name,owner,model,life,city,status,cargo,slug}`, code 200|
|GET   |`/user/data`|Returns id and money of authenticated user, code 200|
|POST  |`/user/signup`|Will create new user in world if don't exists, code 201|
|PUT   |`/user/build/ship`|Will build new user ship if possible, with the given data `{model,ship_name,city}`, return 201 and ship data if success|
|PUT   |`/user/move/ship`|Move ship to given city if possible `{ship,city}`, return 200 if successful|
|PUT   |`/user/buy`|Buy a product from a city to a ship with data `{ship,product,quantity}`, returns 200 if successful|
|PUT   |`/user/sell`|Sell product from ship to city `{ship,product,quantity}`|

>All urls under `restricted/*` requires a valid token, auth header must be `Bearer [token]` to get access. Code 401 otherwise





> Licensed under GNU AFFERO GENERAL PUBLIC LICENSE Version 3
> Maelström logo by @iblancasa under CC-by-sa
