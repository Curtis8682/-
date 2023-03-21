const express = require('express')
const router = express.Router()
const vaccineDao = require('../dao/vaccineDao')
// router.post('/addVaccine', vaccineDao.addVaccine)
router.get('/getVaccine', vaccineDao.getVaccine)
router.get('/getAllVaccine', vaccineDao.getAllVaccine)
router.post('/addVaccine', vaccineDao.addVaccine)
module.exports = router