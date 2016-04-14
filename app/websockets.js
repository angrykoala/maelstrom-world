/*
Name: Map
Project: Maelström - World
Author: demiurgosoft <demiurgosoft@hotmail.com>
Description: 
*/

var socketioJwt = require('socketio-jwt');
var config = require('../config/server');


function onDisconnect() {
	console.log('User disconnected');
}

function setSockets(http) {
	var io = require('socket.io')(http);

	/*io.use(jwtAuth.authenticate({
	    secret: config.secret,    // required, used to verify the token's signature 
	    algorithm: 'HS256'        // optional, default to be HS256 
	}, function(payload, done) {
	    return done(null,payload.id);    
	}));*/
	io.use(socketioJwt.authorize({
		secret: config.secret,
		handshake: true
	}));
	//use socket.request.user to get id
	//When a socket connects
	io.on('connection', function(socket) {
		console.log("User " + socket.decoded_token.id + " connected");
		//will fire when socket disconnects
		socket.on('disconnect', onDisconnect);
	});



}

module.exports = setSockets;