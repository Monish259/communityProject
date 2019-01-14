var express=require('express');
var st=express();
var router=express.Router();
var mongoose = require('mongoose');
var user = mongoose.model('user');
var community=mongoose.model('community');
var bodyParser=require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get('/',function(rq,rs){
    console.log("get on memberList");
    var f=1;
if(rq.query.action == 'user') f=2
else f=1;

    user.find({email:rq.session.email},function(err,docs){
        community.find({name:rq.query.name},function(err,doc){

            rs.render('pages/memberList',{
                d:docs,
                data:doc,
                f:f
            });

        });
       
    });
    
});


module.exports=router;