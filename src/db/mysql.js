const mysql = require("mysql");
const { MYSQL_CONFIG } = require("../config/config");

//创建连接对象


//开始连接


//执行sql语句,封装执行SQL语句的函数
function execSQL(sql) {
    return new Promise((resolve, reject) => {
        const connection = mysql.createConnection(MYSQL_CONFIG);
        connection.connect();
        connection.query(sql, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        })
        connection.end();
    })
}



//关闭连接



module.exports = {
    execSQL,
}