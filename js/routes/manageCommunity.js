var express=require('express');
var st=express();
var router=express.Router();
var mongoose = require('mongoose');
var user = mongoose.model('user');
var community=mongoose.model('community');
var bodyParser=require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
st.locals.a=1;

router.get('/',function(rq,rs){
    console.log("get on manage community");
    var data=rq.body;
    var a=1;
    console.log(rq.query.name+" "+rq.query.list);

    if(rq.query.list== "user")  a=1;
    else if(rq.query.list == "admin")  a=2;
    else if(rq.query.list == "request")  a=3; 
    else if(rq.query.list == "invite")  a=4; 

console.log("a = " + a);
user.find({email:rq.session.email},function(err,doc){
    community.find({name:rq.query.name},function(err,docs){
        rs.render('pages/manageCommunity',{
            a:a,
            data:docs,
            d:doc
        });
        });
});
    
});


router.post('/',function(rq,rs){
    console.log("post on manage community");
    var data=rq.body;
    console.log(data.name+" "+data.list);
  var a;
    if(data.list == "user") { a=1; st.locals.a=a;}
    else if(data.list == "admin") { a=2; st.locals.a=a;}
    else if(data.list == "request") { a=3; st.locals.a=a;}
    else if(data.list == "invite") { a=4; st.locals.a=a;}
     else { a=st.locals.a;}

    console.log("a = "+a);

user.find({email:rq.session.email},function(err,doc){

    community.find({name:data.name},function(err,docs){
        console.log("go");
        rs.render('pages/manageCommunity',{
            a:a,
            data:docs,
            d:doc
        });
    });

});    

});


module.exports=router;