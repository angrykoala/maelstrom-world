/*
Name: Map
Project: Maelström - World
Author: demiurgosoft <demiurgosoft@hotmail.com>
Description: 
*/

var socketioJwt = require('socketio-jwt');
var config = require('../config/server');

var soc;

function onDisconnect() {
	console.log('User disconnected ' + this.id);
	console.log(soc.connected);
}

function setSockets(http) {
	var io = require('socket.io')(http);

	io.use(socketioJwt.authorize({
		secret: config.secret,
		handshake: true
	}));
	//use socket.request.user to get id
	//When a socket connects
	io.on('connection', function(socket) {
		console.log("User " + socket.decoded_token.id + " connected");
		//will fire when socket disconnects
		soc = socket;
		socket.on('disconnect', onDisconnect);
	});
}

module.exports = setSockets;