// 基于mysql模块, 进行二次封装, 执行sql语句的函数
// 口诀: 内部函数想要带结果出来, 用回调函数
// 1. 外面传入函数体进来
// 2. 目标函数内, 回调函数体执行
const dbFn = (sql, fn) => {
    // 目标: 增/删/改 数据
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: 'localhost', // 数据库软件所在的计算机地址
        port: 3306, // 端口
        user: 'root', // 账号
        password: '200316', // 密码
        database: 'ddit' // (自己的数据库名字)
    });
    connection.connect();
    connection.query(sql, function (error, results, fields) {
        if (error) throw error; // 如果执行SQL语句报错了, 直接在控制台输出错误信息
        // console.log('The solution is: ', results); // 打印结果
        fn(results)
        // 查询结果: 返回的是数组+对象
        // 插入结果: 结果对象,  affectedRows: 1, (受影响行数, 1条数据)
        // 修改结果: 结果对象,  affectedRows: 1, (受影响行数, 1条数据)
        // 删除结果: 结果对象,  affectedRows: 1, (受影响行数, 1条数据)
        // 如果数据未发生修改, affectedRows为0, 如果要删除的数据未找到, affectedRows也是0
    });
    connection.end();
}
module.exports = dbFn