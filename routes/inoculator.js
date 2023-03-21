const express = require('express');
const router = express.Router();
const inoculatorDao = require('../dao/inoculatorDao')

router.post('/addInoculator', inoculatorDao.addInoculator)
router.post('/delInoculator', inoculatorDao.delInoculator)
router.get('/getInoculator', inoculatorDao.getInoculator)


module.exports = router