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
    console.log("get on edit community");
    console.log(rq.query.action+" "+rq.query.name+" "+rq.query.uname+" "+rq.query.umail);
    if(rq.query.action == "accept")
    {
        var member={ username:rq.query.uname,email:rq.query.umail };
        community.updateOne({name:rq.query.name},{ $pull: {request : member} },function(err,docs){
           
           if(err) rs.send("Error occured");
           
           else
        {
            community.updateOne({name:rq.query.name},{$push : { members : member} },function(err,doc){
            if(err) console.log('error');
               
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
        }
        });
    }

    else
    {
        var member={ username:rq.query.uname,email:rq.query.umail };
        community.updateOne({name:rq.query.name},{ $pull: {request : member} },function(err,docs){
           
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
    }

});


router.post('/',function(rq,rs){
    
});

module.exports=router;