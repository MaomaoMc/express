/**
 * Created by maomao on 17/3/16.
 */
var mysql = require('mysql');

var pool = mysql.createPool({
    host: 'localhost',
    user:'root',
    database: 'test',  //
    password:'mc333',
    connectionLimit: 10,
    supportBigNumbers: true
});

module.exports = pool;