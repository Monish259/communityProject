var express=require('express');
var router=express.Router();
var mongoose = require('mongoose');
var user = mongoose.model('user');
var community=mongoose.model('community');
var bodyParser=require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get('/',function(rq,rs){
    console.log("get on discover");

user.find({email:rq.session.email},function(err,doc){
    community.find({},function(err,docs){
        rs.render('pages/discover',{
            data:docs,
            d:doc
        });
    });
}); 

});


router.post('/',function(rq,rs){
    var data=rq.body;
    console.log(data.value+" "+data.name+" "+rq.session.email);
    if(data.value == "Join")
    {
        user.find({email:rq.session.email},function(err,docs){
           
            
            var member={ username:docs[0].username,email:docs[0].email };
            console.log(member.username+" "+member.email);

    community.updateOne({name:data.name},{$push : { members : member } },function(err,doc){
        if(err) console.log("error");
        else rs.redirect('/discover');
    });
      
});
    }

    else
    {
        user.find({email:rq.session.email},function(err,docs){
         var member={ username:docs[0].username,email:docs[0].email };
         console.log(member.username+" "+member.email);

    community.updateOne({name:data.name},{$push : { request : member } },function(err,doc){
        if(err) console.log('error');
        else rs.redirect('/discover');
    });

        });
    }

});

module.exports=router;