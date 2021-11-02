const express=require('express');
const router =express.Router();
const dbFn=require('../db.js');
router.get('/userInfo',(req,res)=>{
    console.log(req.user);
    let selSQL=`SELECT username,nickname,email,user_pic FROM user WHERE id=${req.user.id}`;
    dbFn(selSQL,function (result){
        res.send(result[0]);
    })
})
module.exports=router;