var express=require('express');
var router=express.Router();
var mongoose = require('mongoose');
var user = mongoose.model('user');
var bodyParser=require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get('/',function(rq,rs){
    console.log("get on addUser"+rq.session.login);
    if(rq.session.login){
    user.find({email:rq.session.email},function(err,docs){
        rs.render('pages/addUser',{
            data:docs
        });
    });    
        
    }
    else {
        rq.session.login = 1;
        rs.render('pages/login');
    }
    });

router.post('/',function(rq,rs){
console.log("post on addUser");
var data=rq.body;
if(data.roleoptions == "user") var c=3;
else if(data.roleoptions == "commuity builder") var c=2;
else if(data.roleoptions == "admin") var c=1;
var nuser=new user({
username:data.username,
password:data.password,
email:data.email,
gender:data.gender,
city:data.city,
phone:data.phonenumber,
post:c,
active:0,
fill:0,
working:1
});
nuser.save(function(err,nuser){
    if(err) console.log("error");
    else console.log("saved");
});

user.find({email:rq.session.email,password:rq.session.password},function(err,docs){
        rs.render('pages/adminProfile',{
        data:docs
      });
});

});    


module .exports = router;