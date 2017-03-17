/**
 * Created by maomao on 17/3/13.
 */
var express = require("express");
var app = express();
var User = require('./models/User');
app.set('views', './views');  // 指定模板文件存放位置
app.set('view engine', 'jade')  // 设置默认的模板引擎
var router = express.Router();

// router.use(function (req, res, next) {
//     console.log('time', Date.now())
//     next();
// });
//
//
// router.get('/', function (req, res, next) {
//     res.render('regular', {title: 'Hey', message: 'hello there'})
// });
//
// app.use('/', router);

app.get('/users/:userid', function (req, res) {
    var userid = req.params.userid;
    var user = new User();
    user.find(userid, function (err, result) {
        console.log(err, result)
        if(err){
            res.send('not found');
        }
        res.send(result.length === 1 ? result[0] : result)
    })
})
var server = app.listen(3008, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("example app listening at http://%s:%s", host, port)
});