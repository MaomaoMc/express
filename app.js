/**
 * Created by maomao on 17/3/13.
 */
var express = require("express");
var app = express();
var User = require('./models/User');
app.set('views', './views');  // 指定模板文件存放位置
app.set('view engine', 'ejs')  // 设置默认的模板引擎
var session = require('express-session');

app.use(session({
    secret: 'wenzi', // 建议使用 128 个字符的随机字符串
    cookie: { maxAge: 60*60*1000 }, // 设置时间
    resave : false,
    saveUninitialized : true
}));
var user = require('./routes/user');
var index = require('./routes/index');
var list = require('./routes/list');
// var router = express.Router();
var bodyParser = require('body-parser');
app.use(bodyParser());
app.use(bodyParser.urlencoded({extended:false}));

app.use('/user', user);
app.use('/user', index);
app.use('/user', list);
// app.use(function (req, res, next) {
//     //如果session中存在， 则说明已经登录
//     console.log(req.session.user, 'req.session.user')
//
// })

var server = app.listen(3008, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("example app listening at http://%s:%s", host, port)
});