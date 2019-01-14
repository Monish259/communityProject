var express=require('express');
var router=express.Router();
var mongoose = require('mongoose');
var user = mongoose.model('user');
var bodyParser=require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get('/',function(rq,rs){
console.log("get on changePass");
if(rq.session.login){
    user.find({email:rq.session.email,password:rq.session.password},function(err,docs){
        rs.render('pages/changePass',{
            data:docs
        });
    });
     
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
  console.log("changePass post");
  console.log(data.password +" "+data.pass1);
user.findOneAndUpdate({email:rq.session.email},{password:data.pass1},function(err,docs){
    if(err) rs.send("error");
    else rs.render('pages/login');
});
});

module .exports = router;