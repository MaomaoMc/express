/**
 * Created by maomao on 17/3/21.
 */
var express = require('express');
var router = express.Router();  //实例化router
var list_m = require('../models/List');
var moment = require("moment");
var async = require("async");
console.log("shenm")
router.get('/addtopic', function (req , res) {
    console.log(req, res, '56yuhjw')
    //在登录状态下可以添加主题
    if(req.session.user){
        var title = req.query.title,
            content = req.query.content,
            id = req.session.user.id,
            createtime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
        var params = {
            id: id,
            title: title,
            content: content,
            createtime: createtime
        };

        list_m.addTopic(params, function (result) {
            if(result.affectedRows){
                res.json({code:0, msg:'添加成功', data:{
                    url: '/user/list/' + result.insertId + '.html',
                    title: title,
                    author: req.session.user.username,
                    createtime: createtime
                }})
            }else{
                res.json({
                    code: 2,
                    msg: '添加失败， 请重新尝试'
                })
            }
        });
    }else{
        res.json({code: 1, msg: '您还未登录'})
    }
});

router.get('/list/:title.html', function (req, res) {
    var title = req.params.title || 1;
    async.parallel([ //async.parallel([f1, f2, f3,…, fn], fb); 是f1到fn所有的异步都执行完了就会执行fb函数。
        function(callback){
            list_m.getListById(title, function(result){
                callback(null, result[0]);
            })
        },
        // function(callback){
        //     list_m.getReplyById(pid, function(result){
        //         callback(null, result);
        //     })
        // },
    ], function(err, results){
        // console.log( results );
        // res.json(results);
        console.log(results, '34567890-')
        res.render('list', { data:results });
    })
})

module.exports = router;