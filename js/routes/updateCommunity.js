var express=require('express');
var router=express.Router();
var mongoose = require('mongoose');
var user = mongoose.model('user');
var community=mongoose.model('community');
var bodyParser=require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get('/',function(rq,rs){
    console.log("get on updateCommunity");
    if(rq.session.login){
console.log(rq.query.q);
user.find({email:rq.session.email},function(err,doc){

    community.find({owner:rq.query.q},function(err,docs){
        if(docs.length)
        {
          rs.render('pages/updateCommunity',{
             data:docs,
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
    console.log("post on updateCommunity");
    var data=rq.body;

    if(data.status == "active") var a=1;
    else var a=0;
    
if(data.button == "Update" )
{
    community.updateOne({name:data.cname},{working:a},function(err,docs){
        if(err) console.log(err.name);
        else 
    {
       rs.redirect('/communityList');
    }

    });
}
else
{
    rs.redirect('/communityList');
}

});

module.exports=router;