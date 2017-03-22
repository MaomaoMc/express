/**
 * Created by maomao on 17/3/21.
 */
var pool = require('../database'); //链接数据库
module.exports = {
    //获取首页主题
    getIndexList: function (callback) {
        pool.getConnection(function (err, connection) {
            if(err) throw err;

            //连表查询，获取到作者的用户名
            connection.query('SELECT `list`.* FROM `list`, `users` WHERE `list`.`id`=`users`.`id`', function (err, result) {
                console.log(err, result, 'err, result')
                if(err) throw err;

                callback(result);
                connection.release();
            })
        })
    },
    addTopic: function (params, callback) {
        pool.getConnection(function (err, connection) {
            if(err) throw err;

            connection.query('INSERT INTO `list` SET ?', params, function (err, result) {
                console.log(result, 'result')
                if(err)  throw err;

                callback(result);
                connection.release();
            })
        })
    },
    //根据id查询主题的详情信息
    getListById: function (title, callback) {
        pool.getConnection(function (err, connection) {
            if(err) throw  err;

            connection.query('SELECT * FROM `list` WHERE `title`=?', [title], function(err, result) {
                if (err) throw err;

                callback(result);
                connection.release();
            })
        })
    },
    //某主题的回复
    getReplyById: function (pid, callback) {
        pool.getConnection(function(err, connection){
            if(err) throw err;

            connection.query('SELECT * FROM `reply` WHERE `pid`=?', [pid], function(err, result){
                if(err) throw err;

                cb(result);
                connection.release();
                // 接下来connection已经无法使用，它已经被返回到连接池中
            })
        });
    }
}