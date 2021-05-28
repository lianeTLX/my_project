var mysql = require("mysql")
var pool = mysql.createPool({
    host: "192.168.0.109",
    port: 10936,
    user: "root",
    password: "789632145_rooT",
    database: "node_db"
})//数据库连接配置

// function query(sql, callback) {
//     pool.getConnection(function (err, connection) {
//         connection.query(sql, function (err, rows) {
//             callback(err, rows)
//             connection.release()
//         })
//     })
// }//对数据库进行增删改查操作的基础

var query = function (sql, args, callback) {
    pool.getConnection(function (err, conn) {
        if (err) {
            callback(err, null, null);
        } else {
            conn.query(sql, args, function (qerr, vals, fields) {
                //释放连接
                conn.release();
                //事件驱动回调
                callback(qerr, vals, fields);
            });
        }
    });
};
exports.query = query