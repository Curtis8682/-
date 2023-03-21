const { Inoculator } = require('../model/index')
class inoculatorDao extends Inoculator {
  // 删除接种人信息记录
  static async delInoculator (req, res) {
    try {
      const { id } = req.body
      const destroyed = await inoculatorDao.destroy({
        where: { id }
      })
      console.log('look here:', destroyed);
      if (destroyed) {
        res.send({
          code: 200,
          msg: '删除成功',
        })
      } else {
        res.send({
          code: 403,
          msg: '请检查是否重复操作'
        })
      }
    } catch (error) {
      console.log(error);
      res.send({
        code: 403,
        msg: '删除失败，稍后再试'
      })
    }
  }
  // 获取用户名下所有接种人
  static async getInoculator (req, res) {
    try {
      // 使用headers带的token中的uid作为参数
      const inoculators = await inoculatorDao.findAll({
        where: { uid: req.user.uid }
      })
      if (inoculators.length) {
        res.send({
          code: 200,
          inoculators,
        })
      } else {
        res.send({
          code: 403,
          msg: '没有找到接种人',
        })
      }
    } catch (error) {
      console.log(error);
    }
  }
  // 添加接种人
  static async addInoculator (req, res) {
    try {
      const uid = req.user.uid
      const { id, name, tel, sex, address, current, reaction, age } = req.body
      const inoculator = await inoculatorDao.create({
        id, uid, name, tel, sex, address, current, reaction, age
      })
      res.send({
        code: 200, inoculator
      })
    } catch (error) {
      res.send({
        error
      })
    }
  }

}

module.exports = inoculatorDao