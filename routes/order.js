const express = require('express');
const router = express.Router();
const orderDao = require('../dao/orderDao')

router.post('/makeOrder', orderDao.makeOrder)
// router.get('/getOrderByUid', orderDao.getOrderByUid)
router.get('/getOrder', orderDao.getOrder)
router.get('/getOrderByOid', orderDao.getOrderByOid)
router.post('/editOrderStatus', orderDao.editOrderStatus)


module.exports = router