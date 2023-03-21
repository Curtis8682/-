const mysql = require('mysql')
module.exports = {
  config: {
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '123456',
    database: 'bs'
  },
  // 用连接池的方式，使用数据库
  sqlConnect: function (sql, sqlArr, callBack) {
    var pool = mysql.createPool(this.config)
    pool.getConnection((err, conn) => {
      console.log('1111')
      if (err) {
        console.log('连接失败')
        return
      }
      conn.query(sql, sqlArr, callBack)
      conn.release()
    })
  },
  // promise 回调
SySqlConnect: function (sql, sqlArr) {
  // 实例化Promise对象传入函数参数
  return new Promise((resolve, reject) => {
    // 在函数中完成异步操作
    // 创建MySQL连接池
    var pool = mysql.createPool(this.config)
    // 获取连接
    pool.getConnection((err, conn) => {
      // 如果连接失败，直接把Promise对象置为已拒绝（rejected）并带回错误信息
      if (err) reject(err)
      else {
        // 连接成功，执行SQL操作
        conn.query(sql, sqlArr, (err, data) => {
          // 执行失败把Promise对象置为已拒绝（rejected）并带回错误信息
          if (err) reject(err)
          // 执行失败把Promise对象置为已兑现（fulfilled）并带回信息
          else resolve(data)
        })
        // 释放连接
        conn.release()
      }
    })
  }).catch((err) => {
    console.log(err)
  })
}
}