var express=require('express');
var app=express();
var mongoose=require('mongoose');
var cookieParser = require('cookie-parser');
var session = require('express-session');
mongoose.connect('mongodb://localhost/userdb'); 
var schema=mongoose.Schema;
app.use(cookieParser());
app.use(session({secret: "Shh, its a secret!"}));

var uschema=new schema({
username:String,
password:String,
email:String,
gender:String,
city:String,
phone:Number,
post:Number,
active:Number,
interests:String,
journey:String,
img:String,
expect:String,
fill:Number,
working:Number
});

var cschema=new schema({
name:String,
description:String,
members:[{username:String,email:String} ],
owner:String,
admin:[{username:String,email:String} ],
rule:Number,
img:String,
working:Number,
request:[ {username:String,email:String} ],
invite:[ {username:String,email:String} ]
});

var user=mongoose.model('user',uschema);
var community=mongoose.model('community',cschema);

module.exports={
    user:user,
    community:community
};

app.set('view engine','ejs');

var login=require('./routes/login.js');
var home=require('./routes/homepage.js');
var logout=require('./routes/logout.js');
var addUser=require('./routes/addUser.js');
var userList=require('./routes/userList.js');
var update=require('./routes/update.js');
var communityList=require('./routes/communityList.js');
var changePass=require('./routes/changePass.js');
var profileUpdate=require('./routes/profileUpdate.js');
var adminProfile=require('./routes/adminProfile.js');
var userProfile=require('./routes/userProfile.js');
var remove=require('./routes/remove.js');
var communityBuild=require('./routes/communityBuid.js');
var createCommunity=require('./routes/createCommunity.js');
var manageCommunity=require('./routes/manageCommunity.js');
var discover=require('./routes/discover.js');
var updateCommunity=require('./routes/updateCommunity.js');
var communityUser=require('./routes/communityUser.js');
var communityProfile=require('./routes/communityProfile.js');
var editCommunity=require('./routes/editCommunity.js');
var leaveCommunity=require('./routes/leaveCommunity.js');
var memberList=require('./routes/memberList');
var removeFromComm=require('./routes/removeFromComm');

app.use(express.static('public'));

app.use('/login',login);

app.use('/homepage',home);

app.use('/logout',logout);

app.use('/addUser',addUser);

app.use('/userList',userList);

app.use('/update',update);

app.use('/communityList',communityList);

app.use('/changePass',changePass);

app.use('/profileUpdate',profileUpdate);

app.use('/adminProfile',adminProfile);

app.use('/userProfile',userProfile);

app.use('/remove',remove);

app.use('/communityBuild',communityBuild);

app.use('/createCommunity',createCommunity);

app.use('/manageCommunity',manageCommunity);

app.use('/discover',discover);

app.use('/updateCommunity',updateCommunity);

app.use('/communityUser',communityUser);

app.use('/communityProfile',communityProfile);

app.use('/editCommunity',editCommunity);

app.use('/leaveCommunity',leaveCommunity);

app.use('/memberList',memberList);

app.use('/removeFromComm',removeFromComm);

app.get('/',function(rq,rs){
    console.log("get on homepage");
    if(rq.session.login) rs.render('pages/homepage');
    else {
        rq.session.login = 1;
        rs.render('pages/login');
    }
});

app.listen(3000);