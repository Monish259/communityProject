var express=require('express');
var router=express.Router();
var mongoose = require('mongoose');
var user = mongoose.model('user');
var path=require('path');
var community=mongoose.model('community');
var bodyParser=require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get('/',function(rq,rs){
console.log("get on community Build");
user.find({email:rq.session.email},function(err,doc){

if(doc.length)
{
var binfo=doc;
var cp;
console.log(doc[0].username+" "+doc[0].email);
community.find({'members.email':rq.session.email},function(err,docs){
  rs.render('pages/communityBuild',{
  uname:binfo[0].username,
  data:docs,
  d:doc,
});

});

}

  });

});

module.exports=router;