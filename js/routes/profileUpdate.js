var express=require('express');
var router=express.Router();
var mongoose = require('mongoose');
var user = mongoose.model('user');
var path=require('path');
var bodyParser=require('body-parser');
var multer=require('multer');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

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
console.log("get on update profile");
if(rq.session.login){
     user.find({email:rq.session.email,password:rq.session.password},function(err,docs){
       var cp=path.basename(docs[0].img);
         rs.render('pages/editProfile',{
            data:docs, 
            file:'uploads/'+cp
         });
     });
}
else {
    rq.session.login = 1;
    rs.render('pages/login');
}
var d=new Date(Date.now());
console.log(d.toDateString());
});


router.post('/',upload.single('img'),function(rq,rs){
  var data=rq.body;
  console.log("profieUpdate post");
  console.log(data.button);
  if(data.button == "Save Changes")
{
user.find({email:data.email},function(err,docs){
       if(docs.length){ 
    user.updateMany({email:data.email},{username:data.username,city:data.city,gender:data.gender,interests:data.interests,journey:data.journey,fill:1,phone:data.phone,expect:data.expect,img:path.basename(rq.file.path)},function(err,docs){
        if(err) {console.log(err.name); rs.render('pages/login'); }
        else 
    {
       // console.log(docs[0].username +" 1 " +docs[0].interests+" 1 " + docs[0].city+" 1 " + docs[0].journey+" 1 " +docs[0].fill);
            rs.redirect('/userProfile');
    }

    });
        }
    
    else {console.log("no data found") ; rs.render('pages/login');}
});
}

else
{
    rs.redirect('/userProfile');
}

});

module .exports = router;