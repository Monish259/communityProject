var express=require('express');
var router=express.Router();
var mongoose=require('mongoose');
var cookieParser = require('cookie-parser');
var session = require('express-session');
mongoose.connect('mongodb://localhost/userdb');
var schema=mongoose.Schema;
router.use(cookieParser());
router.use(session({secret: "Shh, its a secret!"}));

router.get('/',function(rq,rs){
    console.log("get on homepage");
    if(rq.session.login){
         rs.render('pages/homepage');
    }
    else {
        rq.session.login = 1;
        rs.render('pages/login');
    }
});

module .exports = router;