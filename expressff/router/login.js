const express=require('express');
const router =express.Router();

const dbFn = require('../db.js')
//注册接口
router.post('/register', (req, res) => {
    // 1.拿到前端传过来的数据
    console.log(req.body) //{user: 名字, pass: 密码} -前端写的data里user和pass
    // 2.查询此用户是否存在
    let sqlStr = `SELECT * FROM user WHERE username='${req.body.user}' AND password='${req.body.pass}'`
    // 3. 执行SQL语句
    dbFn(sqlStr, function (result) {
        console.log(result)
        if (result.length === 0) {
            // 4.没查到,没有这个用户,插入一条数据注册
            let insertSQL = `INSERT INTO user SET username='${req.body.user}',password='${req.body.pass}'`
            dbFn(insertSQL, function (insertResult) {
                res.send({
                    msg: '注册成功'
                })
            })
        } else {
            //查到了就返回一个提示
            res.send({
                msg: '用户已存在'
            })
        }
    })
})
//登陆接口
const jwt=require('jsonwebtoken');
router.post('/login',(req,res)=>{
    let sql=`SELECT * FROM user WHERE username='${req.body.user}' AND password='${req.body.pass}'`;
    dbFn(sql,(result)=>{
        if (result.length===0){
            res.send({
                msg:'账号密码错误',
                code:0
            });
        }else {
            res.send({
                msg:'账号密码正确,登陆成功',
                code:1,
                //Bearer后有空格
                token:'Bearer '+jwt.sign({id:result[0].id},'choudidi',{expiresIn: '2h'})
            })
        }
    });
});

module.exports = router;