const express = require('express');
const router = express.Router();
const institutionDao = require('../dao/institutionDao')

router.get('/getInstitution', institutionDao.getInstitution)


module.exports = router