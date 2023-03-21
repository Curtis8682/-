global.globalKey = '123456'
const { User } = require('../model/index')
const jwtUtil = require('../utils/jwtUtil')
const Inoculator = require('../model/inoculatorModel')
class userDao extends User {

  // 注册
  static async register (req, res) {
    try {
      const { username, password, type } = req.body
      // user实例，created指示是否创建了user
      const [users, created] = await userDao.findOrCreate({
        where: { username },
        defaults: {
          password,
          type
        }
      })
      if (created) res.send({ users, code: 200, msg: '注册成功' })
      else res.send({ code: '403', msg: '用户名已存在' })

    } catch (error) {
      res.send({
        code: '403',
        msg: '网络异常，请稍后重试'
      })
    }

  }
  // 登录
  static async login (req, res) {
    try {
      // 获取请求参数中的用户名、密码和用户类型
      const { username, password, type } = req.body
      // 从数据库获取记录
      const user = await userDao.findOne({ where: { username, password, type } })
      const userInfo = {
        uid: user.dataValues.uid,
        username: user.dataValues.username,
        type: user.dataValues.type,
      }    
      // 记录对不上直接返回登录失败
      if (user === null) res.send({ code: '403', msg: '用户名不存在或密码错误，请确认后重试' })
      else {
        // 根据id获取一下接种人信息表的数据填到token
        // 加密token
        const jwt_token = jwtUtil.sign({
          uid: user.uid,
          username: user.username,
          password: user.password,
          type: user.type
        }, global.globalKey, 86400000)
        res.send({
          code: '200', msg: '登录成功', jwt_token, userInfo
        })
      }
    } catch (error) {
      res.send({
        code: '403',
        msg: '网络异常，请稍后重试'
      })
    }
  }
  // 通过token获取用户详情
  static async getUserInfoByToken (req, res) {
    const token = await jwtUtil.verifysync(req.query.token, global.globalKey)
    res.send({
      uid: token.uid
    })
  }
  // 用户修改密码
  static async changePWD (req, res) {
    try {
      const { username, oldPassword, newPassword, type } = req.body

      const match = await userDao.update({ password: newPassword },
        { where: { username, password: oldPassword, type } }
      )
      if (match[0]) {
        res.send({
          code: 200,
          msg: '修改成功'
        })
      } else {
        res.send({
          code: 403,
          msg: '修改失败'
        })
      }
    } catch (error) {
      res.send({
        code: 403,
        msg: '修改失败'
      })
    }
  }
  // 查找名下接种人
  static async findInoclator (req, res) {
    const { uid } = req.body
    try {
      const Inoculators = await userDao.findAll({
        where: { uid },
        include: [{ attributes: ['uid'], model: Inoculator }]
      })
      res.send({
        code: 200,
        Inoculators
      })
    } catch (error) {
      res.send({
        code: 403,
        msg: '查不到'
      })
    }

  }
}

module.exports = userDao