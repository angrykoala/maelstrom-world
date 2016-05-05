var MongoClient = require('mongodb').MongoClient;

// Connection URL
var url = require('../config/database').url;


module.exports = backupCollection = function(name, list, done) {
    var nameback = name + "Back";
    MongoClient.connect(url, function(err, db) {
        if (err) {
            db.close();
            return done(err);
        }
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
                        db.collection(name).insert({back:list}, function(err, res) {
                            db.close();
                            return done(err);
                        });
                });
            });
        });
    });
}
