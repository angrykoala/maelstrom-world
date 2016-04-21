/*
Name: Map
Project: Maelström - World
Author: demiurgosoft <demiurgosoft@hotmail.com>
Description: 
*/

var socketioJwt = require('socketio-jwt');
var config = require('../config/server');
var World = require('./world');

function onDisconnect() {
	console.log('User disconnected ' + this.id);
}

function setSockets(http, done) {
	io = require('socket.io')(http);
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
		/*users.getUser(socket.decoded_token.id,function(err,res){
			if(!err){
				res.addSocket(socket);
			}
		});*/
	});
	done();
}


module.exports = {
	set: setSockets,
	emit: function(userId, event, content) {
		console.log(userId);
		io.to(userId).emit(event, content);
	},
};
