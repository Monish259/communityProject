var express=require('express');
var router=express.Router();
var mongoose = require('mongoose');
var user = mongoose.model('user');
var path=require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser=require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.use(cookieParser());
router.use(session({secret: "Shh, its a secret!"}));


// community.findOneAndUpdate({owner:"t1@gmail.com"},{owner:"testidsfj"},function(err,docs){});

// var nuser=new user({
// username:'monish',
// password:'abc12345',
// email:'monish@superadmin.com',
// gender:'male',
// city:'nalagarh',
// phone:8895634175,
// post:1,
// active:1,
// fill:1,
// working:1,
// interests:"gaming,developing",
// journey:"just started",
// expect:"nothing"
// });

// nuser.save();


router.get('/',function(rq,rs){
console.log("get on login");
if(rq.session.login){
     rs.redirect('/homepage');
}
else {
    rq.session.login = 1;
    rs.render('pages/login');
}
var d=new Date(Date.now());
console.log(d.toDateString());
});

router.post('/',function(rq,rs){
var data=rq.body;
console.log("login post");
user.find({email:data.email,password:data.password},function(err,docs){

    rq.session.email=data.email;
    rq.session.password=data.password;
console.log(docs.length+" "+data.email+" "+data.password);
if(docs.length)
{
if(docs[0].working == 1)
{
if(docs.length && docs[0].fill==0 && docs[0].post != 1)
    {
     rs.render('pages/profileUpdate',{
      data:docs
     });
    }

else if(docs.length)
{         
if(docs[0].post == 1) {
    rs.render('pages/adminProfile',{
    data:docs
});
}
else if(docs[0].post == 2){
    rs.render('pages/userProfile',{
        data:docs,
        file:'uploads/'+docs[0].img
    });
}
    
else if(docs[0].post == 3){
    rs.render('pages/userProfile',{
        data:docs,
        file:'uploads/'+docs[0].img
    });
}

}

}

else
{
    console.log('1');
    rs.render('pages/login',{
        msg:'Error! Wrong Details Entered'
    });
}

}
    else {
        console.log('2');
        rs.render('pages/login',{
            msg:'Error! Wrong Details Entered'
        });
    }
    });

});

module .exports = router;