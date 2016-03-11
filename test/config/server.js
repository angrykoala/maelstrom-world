var app = require('express')();
require('../../app/routes.js')(app); //loads routes
var gu = require('../../app/game_update');

var server;

module.exports.app = app;
module.exports.gu = gu;
module.exports.stopServer = function() {
	server.close();
};
module.exports.startServer = function(done) {
	server = app.listen(8080, function() {
		if (done) done();
	});
};