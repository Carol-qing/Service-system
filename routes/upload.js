let express = require('express')
let router = express.Router()
const multer  = require('multer')
let path = require('path')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/images")
    },
    // 文件名字
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    }
    
})

// 根据存储设置，创建upload
const upload = multer({ storage: storage }).single("img")

router.post('/',upload, function(req,res) {
    let file = req.file //图片对象
    let imgUrl = '/images/' + file.filename
    res.json({
        code: 1,
        msg: '上传文件成功'
    })
})


module.exports = router