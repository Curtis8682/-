var express = require('express');
var router = express.Router();
var { expressjwt: jwt } = require('express-jwt')

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
// router.use(
//   jwt({
//     secret: '123456',
//     algorithms: ['HS256']
//   })
// )

module.exports = router;
