var express=require('express');
var router=express.Router();

router.get('/',function(rq,rs){
    console.log('logout get');
    rq.session.destroy();
    rs.render('pages/login');
});

module .exports = router;