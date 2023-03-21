const express = require('express');
const router = express.Router();
const userDao = require('../dao/userDao')
/* GET users listing. */

router.post('/register', userDao.register)
router.post('/login', userDao.login)
router.get('/getUserInfoByToken', userDao.getUserInfoByToken)
// // 修改密码
router.post('/PostChangePWD', userDao.changePWD)
// // 新增意见反馈
// router.post('/PostAddFeedBack', userDao.addFeedBack)
// // 修改意见反馈状态
// router.post('/PostSetFeedBackStatus', userDao.setFeedBackStatus)
// 查看名下接种人
router.get('/getInoculatorByUid', userDao.findInoclator)
module.exports = router;
