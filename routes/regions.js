var express = require('express');
var router = express.Router();
var { Regions } = require("../models/index")

/* GET home page. */
router.get('/', function(req, res, next) {
    Regions.find()
    .then((r) => {
      res.json(r)
    })
    .catch((err)=> {
      res.json({
        code: 0,
        msg: '查询部门失败'
      })
    })
});

module.exports = router;
