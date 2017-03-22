/**
 * Created by maomao on 17/3/20.
 */
var express = require('express');

var router = express.Router();  //实例化router
var user_m = require('../models/User'); // 引入model
//定义主页路由
// router.get('/', function (req, res, next) {
//    res.render('index', {title: 'user'})  //加载index.ejs模板并传递数据给模板
// });

router.get('/reg', function (req, res, next) {
    // console.log(req, res, 'req, res')
    res.render('reg', {title: 'reg', errmsg:''})
});

router.post('/reg',function (req, res, next) {
    var body = req.body,
        username = body.username || '',
        password = body.password || '',
        password2 = body.password2 || '';
    if(password != password2){
        res.render('reg', {errmsg: '密码不一致'})
        return;
    }


    var password_hash = user_m.hash(password),  //对密码进行加密
        regtime = parseInt(Date.now()/1000);
// post方式
//     router.post('/reg', function(req, res, next) {
        // 与上面的代码一样

        // 数据库处理
        user_m.reg(username, password_hash, regtime, function(result){
            if(result.isExisted){
                res.render('reg', {errmsg:'用户名已存在'}); // 重新加载注册模板，并提示用户名已存在
            }else if(result.affectedRows){ //影响行数
                // 注册成功
                res.redirect('/');
            }else{
                // console.log('登录失败');
                res.render('reg', {errmsg:'注册失败，请重新尝试'});
            }
        });
    // });
});
//进入登录页面
router.get('/login', function (req, res, next) {
    res.render('login', {errmsg: ''});
});
//处理登陆请求
router.post('/login', function (req, res, next) {
    var username = req.body.username || '',
        password = req.body.password || '';

    var password_hash = user_m.hash(password);
    user_m.login(username, password_hash, function (result) {
        if(result.length){
            req.session.user = {
            	id : result[0].id,
            	username : username
            }
            res.redirect('/user');
            // res.send('登录成功');
        }else{
            // console.log('登录失败');
            res.render('login', {errmsg:'用户名或密码错误'});
        }
    })
})


module.exports = router;