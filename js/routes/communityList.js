var express=require('express');
var st=express();
var router=express.Router();
var mongoose = require('mongoose');
var user = mongoose.model('user');
var community = mongoose.model('community');
var bodyParser=require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
st.locals.p="All";
st.locals.pe=0;

router.get('/',function(rq,rs){
    console.log("get on communitylist");
    if(rq.session.login){
    user.find({email:rq.session.email},function(err,doc){

        community.find({},function(err,docs){
            rs.render('pages/communityList',{
                 ent:10,
                 option:'All',   
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
    console.log("post on community List");
    var data=rq.body;
    if(data.pen == "All") {var p=0; st.locals.p="All"; st.locals.pe=0;}
    else if(data.pen == "Direct") {var p=1; st.locals.p="Direct"; st.locals.pe=1;}
    else if(data.pen == "Permission") {var p=2; st.locals.p="Permission"; st.locals.pe=2;}
    else {var p=st.locals.pe; data.pen=st.locals.p;}

    if(p==0)
    {
    user.find({email:rq.session.email},function(err,doc){

        community.find({},function(err,docs){
            rs.render('pages/communityList',{
                option:'All',
                ent:10,
                data:docs,
                d:doc
            });
        });

    });  
       
    }
    else if(p==1)
    {

    user.find({email:rq.session.email},function(err,doc){        
        community.find({rule:p},function(err,docs){
            rs.render('pages/communityList',{
                option:data.pen,
                ent:10,
                data:docs,
                d:doc
            });
        });
    });
    }

    else if(p==2)
    {
    user.find({email:rq.session.email},function(err,doc){
        community.find({rule:p},function(err,docs){
            rs.render('pages/communityList',{
                option:data.pen,
                ent:10,
                data:docs,
                d:doc
            });
        });
    });
    }

});
       
module .exports = router;