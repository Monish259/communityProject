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
    
console.log('get on remove from community');

var member={ username:rq.query.uname,email:rq.query.umail };
community.updateOne({name:rq.query.name},{ $pull: {members : member} },function(err,docs){
   
   if(err) rs.send("Error occured");
   
else 
   {
   user.find({email:rq.session.email},function(err,doc){
     
      community.find({name:rq.query.name},function(err,docs){
         rs.render('pages/manageCommunity',{
             a:1,
             data:docs,
             d:doc
         });
         });
   });   
    
   }

});

});


module.exports=router;