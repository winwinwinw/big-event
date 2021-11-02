const express=require('express');
const server=express();
server.use(express.static('../dd'));

server.get('/api/welcome',(req,res)=>{
    res.send('欢迎欢迎');
});
// 提取请求体里的参数名和值, 形成一个对象挂载到req.body里
// 把前端查询字符串key=value&key=value转成对象形式
server.use(express.urlencoded({extended: true}));
// 前端如果传递的是json字符串
server.use(express.json());
const expressJwt=require('express-jwt');
server.use(
    expressJwt({
        secret:'choudidi',
        algorithms:['HS256']
    }).unless({
        path:['/api/login','/api/register']
    })
)

server.use((req,res,next)=>{
    let { user,pass}=req.body;
    if(/^[a-zA-Z][0-9a-zA-Z_]{1,9}$/.test(user)===false){
        next('用户名只能包含数字,字母,下划线,长度为2-10位,以字母开头');
    }
    // else if(/^\S{6,12}$/.test(pass)===false){
    //     next('密码为6-12位且不能有空格');
    // }
    else{
        next();
    }
});
const loginRouter=require('./router/login.js');
server.use('/api',loginRouter);

//获取个人信息相关接口
const userRouter=require('./router/user.js')
server.use('/my',userRouter);

//错误处理
server.use((err,req,res,next)=>{
   if(err.name === 'UnauthorizedError'){
       res.status(401).send({
           code :0,
           msg:'token已过期'
       })
   }else {
       res.status(403).send({
           msg:err
       })
   }
});

server.listen(5423,()=>{
    console.log('http://localhost:5423');
});
