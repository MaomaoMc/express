/**
 * Created by maomao on 17/3/16.
 */
var db = require('../database');
var _ = require('underscore');

var User = function () {

};

User.prototype.find = function (id, callback) {
    var sql = 'SELECT * FROM user WHERE id =?';

    db.pool.getConnection(function (err, connection) {
        if(err){
            callback(true);
            return;
        }

        connection.query(sql, [id], function (err, results) {
            if(err){
                callback(true);
                return;
            }console.log("Sd")
            callback(false, results);
        });
    });
};

module.exports = User;