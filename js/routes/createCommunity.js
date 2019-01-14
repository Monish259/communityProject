var express=require('express');
var st=express();
var router=express.Router();
var mongoose = require('mongoose');
var user = mongoose.model('user');
var multer=require('multer');
var path=require('path');
var community=mongoose.model('community');
var bodyParser=require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
st.locals.u="no";

//storage engine
const storage = multer.diskStorage({
    destination : './public/uploads',
    filename: function(req,file,cb){
        cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });
  //upload variable
  
  const upload=multer({
    storage:storage,
    limits:{fileSize: 1000000},
    fileFilter:function(req,file,cb){
        checkfileType(file,cb);
    }
  })
  
  function checkfileType(file,cb){
    //allowed extension
    const fileTypes = /jpeg|jpg|png/;
    //check ext
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    //check mime type
    const mimetype=fileTypes.test(file.mimetype);
  
    if(mimetype && extname){
        return cb(null,true);
    } else {
        cb('Error : images only!');
    }
  }


router.get('/',function(rq,rs){
    console.log("get on create community");
    user.find({email:rq.session.email},function(err,docs){
        rs.render('pages/createCommunity',{
            data:docs
        });
    });
    
});

router.post('/',upload.single('img'),function(rq,rs){
    console.log("post on create community");
     var u;
    var data=rq.body;
    console.log(data.description+" "+data.name+" "+data.rule);
    if(data.rule == 'D') var a=1;
    else var a=2;
    var owner=rq.session.email;
    console.log(owner);
    user.find({email:owner},function(err,docs){
        if(docs.length) {
            st.locals.u=docs[0].username;
            console.log(st.locals.u);
            ncomm=new community({
                name:data.name,
                description:data.description,
                rule:a,
                members:[{username:docs[0].username,email:owner}],
                admin:[{username:docs[0].username,email:owner}],
                owner:docs[0].username,
                working:1,
                img:path.basename(rq.file.path),
                });
                ncomm.save(function(err,nuser){
                    if(err) console.log("error");
                    else console.log("saved");
                });
        
                rs.redirect('/communityBuild');
        }
    });

    // ncomm=new community({
    //     name:data.name,
    //     description:data.description,
    //     rule:a,
    //     members:[{username:user,email:owner}],
    //     owner:user,
    //     working:1
    //     });
    //     ncomm.save(function(err,nuser){
    //         if(err) console.log("error");
    //         else console.log("saved");
    //     });

    //     rs.redirect('/communityBuild');
});

module.exports=router;