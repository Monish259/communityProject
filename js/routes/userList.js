var express=require('express');
var st=express();
var router=express.Router();
var mongoose = require('mongoose');
var user = mongoose.model('user');
var bodyParser=require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
st.locals.p=2;
st.locals.r=4;
st.locals.m="All";
st.locals.c="All";
st.locals.ent=10;
st.locals.pg=0;

router.get('/',function(rq,rs){
    console.log("get on userlist");
    if(rq.session.login){
    user.find({email:rq.session.email},function(err,doc){

        user.find({},function(err,docs){
             
            rs.render('pages/userList',{
                option:'All',
                role:'All',
                ent:10,
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
    console.log("post on userList");
    data=rq.body;
    
    if(data.p == "Pending") {var a=0;st.locals.p=a;st.locals.m=data.p;}
    else if(data.p == "Confirmed") {var a=1;st.locals.p=a;st.locals.m=data.p;}
    else if(data.p == "All") {var a=2;st.locals.p=a;st.locals.m=data.p;}
    else {var a=st.locals.p;data.p=st.locals.m;}
    if(data.r == "Admins") {var b=1;st.locals.r=b;st.locals.c=data.r}
    else if(data.r == "User") {var b=3;st.locals.r=b;st.locals.c=data.r}
    else if(data.r == "Community Builder") {var b=2;st.locals.r=b;st.locals.c=data.r}
    else if(data.r == "All") {var b=4;st.locals.r=b;st.locals.c=data.r}
    else {var b=st.locals.r;data.r=st.locals.c;}
    
    if(data.e == "10") {var en=10; st.locals.ent=en; }
    else if(data.e == "25") {var en=25; st.locals.ent=en; }
    else if(data.e == "50") {var en=50;st.locals.ent=en; }
    else {var en=st.locals.ent;}

    console.log(data.p + " " + data.r + " " + st.locals.p +" "+a+" "+st.locals.r+" "+b+" "+data.e+" "+st.locals.ent);

    if(a==2 && b==4)
    {
    user.find({email:rq.session.email},function(err,doc){

        user.find({},function(err,docs){
            console.log(docs.length+" "+en);
            rs.render('pages/userList',{
                 option:'All',
                 role:'All',
                 ent:en,
                 data:docs,
                 d:doc
                });
        });

    });    
        
    }
    
else if(a != 2 && b==4)
{
 
user.find({email:rq.session.email},function(err,doc){    
    user.find({active:a},function(err,docs){
        console.log(docs.length+" "+en);
        rs.render('pages/userList',{
            option:data.p,
            role:'All',
            ent:en,
            data:docs,
            d:doc
        });
      });
    });
}

else if(a == 2 && b!=4)
{
user.find({email:rq.session.email},function(err,doc){   
    user.find({post:b},function(err,docs){
        console.log(docs.length+" "+en);
        rs.render('pages/userList',{
            option:'ALL',
            role:data.r,
            ent:en,
            data:docs,
            d:doc
        });
      });
    });
}

    else
    {
user.find({email:rq.session.email},function(err,doc){       
    user.find({active:a,post:b},function(err,docs){
        console.log(docs.length+" "+en);
        rs.render('pages/userList',{
          option:data.p,
          role:data.r,
          ent:en,
          data:docs,
          d:doc
      });
    });

    });
}
});    

       
module .exports = router;