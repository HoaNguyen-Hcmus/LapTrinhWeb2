var express = require('express'),
	multer = require('multer'),
	nguoibanRepo = require('../repos/nguoibanRepo'),
	checkToken = require('../fn/checkToken'),
	fs = require('fs'),
	checkToken = require('../fn/checkToken'),
	mkdirp = require('mkdirp');

var router = express.Router();

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
    	nguoibanRepo.getNewId()
		.then(rows => {
			var dir = `./public/${rows[0].NewID}`;
			mkdirp(dir, (err) => { if(err) console.log(err); });
			cb(null, dir);
		})
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
});

var upload = multer({
    storage: storage
});


router.get('/danhmuc', checkToken.checkTokenUser, (req, res) => {
	nguoibanRepo.showDanhMuc()
	.then(rows => {
		res.statusCode = 200;
		res.json({
			danhmuc: rows
		})
	})
	.catch(err => {
		res.statusCode = 400;
		res.json({
			err: err
		})
	})
})

router.post('/dangban', checkToken.checkTokenUser, (req, res) => {
	nguoibanRepo.dangBan(req.body)
	.then(rowadd => {
		if(rowadd > 0)	{
			nguoibanRepo.dangMoTa(rowadd, req.body.mota)
			.then(row => {
				if(row > 0) {
					res.statusCode = 200;
					res.json({
						mess: "Đăng bán sản phẩm thành công..."
					})
				} else {
					res.statusCode = 400;
					res.json({
						err: "Đăng mô tả sản phẩm không thành công..."
					})
				}
			})
			.catch(err => {
				res.statusCode = 400;
				res.json({
					err: `Lỗi truy vấn: ${err}`
				})
			})	
		} else {
			res.statusCode = 400;
			res.json({
				err: "Đăng bán sản phẩm không thành công..."
			})
		}
	})
	.catch(err => {
		res.statusCode = 400;
		res.json({
			err: `Lỗi truy vấn: ${err}`
		})
	})
});

router.post('/uploadImage', upload.array('photos', 3), (req, res) => {

	res.end("Đăng hình thành công");
})

module.exports = router;