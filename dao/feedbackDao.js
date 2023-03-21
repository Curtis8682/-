class FeedbackDao extends require('../model/feedbackModel') {
  // 提交新的反馈
  static async submitFeedback (req, res) {
    try {
      console.log(req.body);
      const result = await FeedbackDao.create({
        uid: req.user.uid, content: req.body.content
      })
      res.send({
        code: 200,
        result
      })
    } catch (err) {
      res.send({
        code: 404,
        msg: '提交失败'
      })
      console.log(err);
    }
  }
  // 获取反馈记录
  static async getFeedback (req, res) {
    try {
      const feedbacks = await FeedbackDao.findAll({ where: { uid: req.user.uid }, order: [['create_time', 'DESC']] })
      if (feedbacks != null)
        res.send({
          code: 200,
          feedbacks
        })

      else
        res.send({
          code: 204,
          msg: '没有反馈记录'
        })

    } catch (error) {
      res.send({
        code: 404,
        msg: '查询失败'
      })
    }
  }
}
module.exports = FeedbackDao