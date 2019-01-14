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
    console.log("get on leave Community");
    console.log(rq.query.name+" "+rq.query.uname+" "+rq.query.umail);
    var member={ username:rq.query.uname,email:rq.query.umail };
    
    community.updateOne({name:rq.query.name},{$pull : { members : member } },function(err,doc){
        if(err) console.log("error");
        else rs.redirect('/discover');
    });

});

module.exports=router;