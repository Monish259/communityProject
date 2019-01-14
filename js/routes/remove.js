var express=require('express');
var router=express.Router();
var mongoose = require('mongoose');
var user = mongoose.model('user');
var bodyParser=require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get('/',function(rq,rs){
    console.log("get on remove");
    if(rq.session.login){
console.log(rq.query.q);
user.find({email:rq.session.email},function(err,doc){
    user.find({email:rq.query.q},function(err,docs){
        rs.render('pages/remove',{
            data:docs,
            d:doc
        });
     });
});
        
    }
    else {
        rq.session.login = 1;
        rs.render('pages/login');
    }
});

router.post('/',function(rq,rs){
console.log('post on remove');
var data=rq.body;
console.log(data.email +" "+data.button+" "+data.working);
if(data.button == "Cancel")
{
    rs.redirect('/userList');
}
else
{

if(data.working == 1) var a=0;
else var a=1;

    user.updateOne({email:data.email},{working:a},function(err,docs){
        if(err) rs.send("error occured");
        else rs.redirect('/userList');
    });
}

});

module.exports=router;