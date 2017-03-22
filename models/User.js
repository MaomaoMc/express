/**
 * Created by maomao on 17/3/16.
 */
// var db = require('../database');
var pool = require('../database'), //链接数据库
    crypto = require('crypto'); //对密码加密
module.exports = {
    //对字符串进行sha1加密
    hash: function (str) {
        return crypto.createHmac('sha1', str).update('love').digest('hex');
    },
    //注册
    //因数据库操作是异步操作， 则需要传入回调函数来对结果进行处理， 而不能使用return方式

    reg: function (username, password, regtime, callback) {
        pool.getConnection(function (err, connection) {
            if(err)  throw err;

            //首先检测用户是否存在
            connection.query('SELECT `id` FROM `users` WHERE `username`=?', [username], function (err, sele_res) {
                if(err) throw err;
                //如果用户存在， 则直接回调
                if(sele_res.length){
                    callback({isExisted: true});
                    connection.release();
                }else{
                    //否则将信息插入到数据库中
                    var params = {username: username, password:password};
                    connection.query('INSERT INTO `users` SET ?', params, function (err, insert_res) {
                        if(err) throw err;
                        callback(insert_res);
                        connection.release();   //接下来connection已经无法使用，  他已经被返回到连接池
                    })
                }
            })
        })
    },
    login: function (username, password, callback) {
        pool.getConnection(function (err, connection) {
            if(err) throw err;

            connection.query('SELECT `id` FROM `users` WHERE `username`=? AND `password`=?', [username,password], function (err, result) {
                if(err) throw err;

                callback(result);
                connection.release();
            })
        })
    }
}