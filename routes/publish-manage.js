var express = require('express');
var router = express.Router();

/** 
 * /audit-manage/audit
*/
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


module.exports = router;
