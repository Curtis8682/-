const { Op } = require("sequelize");
class vaccineDao extends require('../model/vaccineModel') {
  // 获取可预约疫苗
  static async getVaccine (req, res) {
    const vaccine = await vaccineDao.findAll({
      where: {
        remain: { [Op.gt]: 1 }
      }
    })
    res.send({
      code: 200,
      vaccine
    })
  }
  // 获取所有疫苗
  static async getAllVaccine (req, res) {
    const vaccines = await vaccineDao.findAll()
    res.send({
      code: 200,
      vaccines
    })
  }
  // 疫苗入库
  static async addVaccine (req, res) {
    console.log(req.body);
    const { vid, name, remain, method, company, produce_time }
      = req.body
    const addVaccineResult = await vaccineDao
      .create({ vid, name, remain, method, company, produce_time })
    res.send({
      code: 200,
      addVaccineResult
    })
  }
}


module.exports = vaccineDao