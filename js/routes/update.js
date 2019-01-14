var express=require('express');
var router=express.Router();
var mongoose = require('mongoose');
var user = mongoose.model('user');
var bodyParser=require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get('/',function(rq,rs){
    console.log("get on update");
    if(rq.session.login){
console.log(rq.query.q);
user.find({email:rq.session.email},function(err,doc){

    user.find({email:rq.query.q},function(err,docs){
        if(docs.length)
        {
      
          if(docs[0].post == 1) var a="admin";
          else if(docs[0].post == 2) var a="community builder";
          else var a="user";

          if(docs[0].active == 0) var b="pending";
          else var b="confirmed";

          rs.render('pages/update',{
             email:docs[0].email,
             phone:docs[0].phone,
             username:docs[0].username,
             city:docs[0].username,
             status:b,
             post:a,
             d:doc
          });
      }
      });

});
        
    }
    else {
        rq.session.login = 1;
        rs.render('pages/login');
    }
});

router.post('/',function(rq,rs){
    console.log("post on update");
    var data=rq.body;
    if(data.status == "confirmed") var a=1;
    else var a=0;
if(data.role == "user") var c=3;
else if(data.role == "commuity builder") var c=2;
else if(data.role == "admin") var c=1;
    console.log(data.username +data.phone +data.role+data.status);
    
if(data.button == "Update" )
{
    user.updateMany({email:data.email},{username:data.username,city:data.city,phone:data.phone,active:a,post:c},function(err,docs){
        if(err) {console.log(err.name);}
        else 
    {
       rs.redirect('/userList');
    }

    });
}
else
{
    rs.redirect('/userList');
}

});

module.exports=router;