/**
 * Created by maomao on 17/3/21.
 */
var express = require('express');

var router = express.Router();  //实例化router
var list_m = require('../models/List');
router.get('/', function (req, res, next)  {
    if(req.session.user){
        res.locals.user = {
            id : req.session.user.id,
            username : req.session.user.username
        }
    }else{
        res.locals.user = {};
    }
    console.log(res.locals, 'res.localsres.locals')

    list_m.getIndexList(function (result) {
        res.render('index',{data: result});  //选择index模板并传递数据
    });
    // next();
})

module.exports = router;