const express = require('express');
const router = express.Router();
const feedbackDao = require('../dao/feedbackDao')

router.get('/getFeedback', feedbackDao.getFeedback)
router.post('/submitFeedback', feedbackDao.submitFeedback)




module.exports = router