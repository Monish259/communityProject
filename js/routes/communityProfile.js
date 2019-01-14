var express=require('express');
var st=express();
var router=express.Router();
var mongoose = require('mongoose');
var user = mongoose.model('user');
var path=require('path');
var community=mongoose.model('community');
var bodyParser=require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get('/',function(rq,rs){
    console.log("get on community Profile");
    console.log(rq.query.name+" "+rq.query.arrive);

user.find({email:rq.session.email},function(err,doc){
    community.find({name:rq.query.name},function(err,docs){
        rs.render('pages/communityProfile',{
            data:docs,
            d:doc,
            f:rq.query.arrive,
         });
            });
});    


});

module.exports=router;