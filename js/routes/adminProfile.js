var express=require('express');
var router=express.Router();
var mongoose = require('mongoose');
var user = mongoose.model('user');
var bodyParser=require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get('/',function(rq,rs){
console.log("get on profile");
if(rq.session.login){

    user.find({email:rq.session.email,password:rq.session.password},function(err,docs){
        rs.render('pages/adminProfile',{
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


module .exports = router;