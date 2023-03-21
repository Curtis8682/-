// const inoculatorDao = require('./inoculatorDao')
// const userModel = require('../model/userModel')
const vaccineDao = require('./vaccineDao')
const mysql = require('../model/mysql')

class orderDao extends require('../model/orderModel') {
  // 修改order的status
  static async editOrderStatus (req, res) {
    // 获取oid和接种目标状态参数
    const { oid, status } = req.body
    // 更新数据库数据
    const result = await orderDao.update({ status }, { where: { oid } })
    console.log(result);
    // 返回结果给前端
    if (result[0] === 1) res.send({ code: 200, msg: '修改成功' })
    else res.send({ code: 404, msg: '修改失败' })

  }
  // 根据oid获取预约记录
  static async getOrderByOid (req, res) {
    try {
      // 获取订单号参数
      const { oid } = req.query
      console.log(oid)
      // 查询订单信息和接种人信息
      const sql = "SELECT * FROM `order`LEFT OUTER JOIN `inoculator` ON `order`.id = `inoculator`.id WHERE `order`.oid = ?"
      // 执行SQL语句
      const order = await mysql.SySqlConnect(sql, [oid])
      // 返回数据给前端
      if (order.length !== 0) res.send({ code: 200, order })
      else res.send({ code: 404 })
    } catch (error) {
      res.send({ code: 500, msg: '没有数据' })
      console.log(error)
    }
  }
  // 根据uid获取预约记录
  static async getOrder (req, res) {
    try {
      const sql = "SELECT * FROM `user` RIGHT OUTER JOIN `inoculator` ON `user`.uid = `inoculator`.uid RIGHT OUTER JOIN `order` ON `inoculator`.id = `order`.id WHERE `inoculator`.uid  = ?"
      const result = await mysql.SySqlConnect(sql, [req.user.uid])
      if (result.length !== 0) {
        res.send({
          code: 200,
          orders: result
        })
      } else {
        res.send({
          code: 200,
          msg: '没有找到预约记录'
        })
      }
    } catch (err) {
      res.send({
        code: 404
      })
    }
  }
  // 预约接种
  static async makeOrder (req, res) {
    try {
// 从请求参数获取参数
const { id, vid, date, address } = req.body
// 使用事务
const result = await orderDao.sequelize.transaction(async (t) => {
  // 先检查疫苗余量
  const vaccineRemain = await vaccineDao.findOne({
    attributes: ['remain'], where: { vid }, transaction: t
  })
  // 疫苗减一
  await vaccineDao.update({ remain: vaccineRemain.dataValuesNaNpxain - 1 }, { where: { vid }, transaction: t })
  // 新建预约记录
  const orderResult = await orderDao.create({
    id, vid, date, address
  }, { transaction: t })
  return orderResult
})
      res.send({
        code: 200,
        result
      })
    } catch (err) {
      console.log(err)
      res.send({
        code: 404,
        msg: '预约失败'
      })
    }
  }
  // 根据username查找到名下所有预约
  // static async findOrder (req, res) {
  //   const { username } = req.body
  //   const data = await orderDao.findAll({
  //     where: { username }
  //   })
  // }
  // 用res.user.uid，连表连inoculator，最后联order表
}
module.exports = orderDao