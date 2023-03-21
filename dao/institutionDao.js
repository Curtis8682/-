class institutionDao extends require('../model/institutionModel') {
  // 获取医疗机构
  static async getInstitution (req, res) {
    try {
      const institution = await institutionDao.findAll()
      res.send({
        code: 200,
        institution
      })
    } catch (err) {
      res.send({
        code: 404,
        err
      })
    }
  }
}

module.exports = institutionDao