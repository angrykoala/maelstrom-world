/*
Name: Map
Project: Maelström - World
Author: demiurgosoft <demiurgosoft@hotmail.com>
Description: 
*/

var socketioJwt = require('socketio-jwt');
var config = require('../config/server');

function onDisconnect() {
	console.log('User disconnected ' + this.id);
}

module.exports.set=function(http, done) {
	var io = require('socket.io')(http);
	io.use(socketioJwt.authorize({
		secret: config.secret,
		handshake: true
	}));
	//use socket.request.user to get id
	//When a socket connects
	io.on('connection', function(socket) {
		console.log("User " + socket.decoded_token.id + " connected");
		socket.join(socket.decoded_token.id);
		socket.on('disconnect', onDisconnect);
		//console.log(World);
		/*Users.getUser(socket.decoded_token.id,function(err,res){
			if(!err){
				res.addSocket(socket);
			}
		});*/
	});
	done(null,io);
};
