var express = require('express'),
	jwt = require('jsonwebtoken');

var loginRepo = require('../repos/loginRepo');
var checkToken = require('../fn/checkToken');
var c = require('../fn/const');

var router = express.Router();

router.post('/', (req, res) => {	
	if (req.body.user != "" && req.body.pass != "") {
		loginRepo.load(req.body.user, req.body.pass)
		.then(rows => {
			if(rows.length != 0) {

				loginRepo.checkBanHang(rows[0].ID)
				.then(rows1 => {
					var pay_load = {
						user: req.body.user
					}

					var token = jwt.sign(pay_load, c.SECRET_KEY_USER, {
						expiresIn: 6000
					});

					res.statusCode = 200;

					if(rows1.length != 0) {
						if(rows1[0].ThoiGianConLai <= 7 && rows1[0].ThoiGianConLai >= 0) {
							res.json({
								access_token: token,
								user: rows[0].NAME,
								id: rows[0].ID,
								banhang: 1
							});
						} else {
							res.json({
								access_token: token,
								user: rows[0].NAME,
								id: rows[0].ID,
								banhang: 0
							});
						}
					} else {						
						res.json({
							access_token: token,
							user: rows[0].NAME,
							id: rows[0].ID,
							banhang: 0
						});
					}
				})
				.catch(err => {
					console.log(err);
					res.statusCode = 500;
					res.json({
						err: "Lỗi bán hàng"
					});
				});
			} else {
				res.statusCode = 401;
				res.json({
					msg: 'Đăng nhập thất bại'
				});
			}
		})
		.catch(err => {
			console.log(err);
			res.statusCode = 500;
			res.json('error');
		});
	}
	else {
		res.statusCode = 400;
		res.json('error');
	}
});

module.exports = router;