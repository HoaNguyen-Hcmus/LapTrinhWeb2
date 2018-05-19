var express = require('express'),
	jwt = require('jsonwebtoken'),
	q = require('q'),
	constants = require('../fn/const'), 
	fnCheckToken = require('../fn/checkToken');
	adminRepo = require('../repos/adminRepo');

var router = express.Router();


router.get('/', fnCheckToken.checkTokenAdmin, (req, res) => {
	res.statusCode = 200;
	res.json({
		mess: "Đã đăng nhập"
	});
});

router.get('/test', (req, res) => {
	res.json({
		mess: 'Test controller'
	});
});

router.post('/login', (req, res) => {
	adminRepo.checkLogin(req.body.user, req.body.pass)
	.then(rows => {
		if(rows.length != 0) {
			var pay_load = {
				user: req.body.user
			}

			var token = jwt.sign(pay_load, constants.SECRET_KEY_ADMIN, {
				expiresIn: 6000
			});

			res.json({
				access_token: token,
				user: rows[0].NAME
			});
		} else {
			res.statusCode = 401;
			res.json({
				msg: 'login failed => no token',
				err: err
			});
		}
	})
	.catch(err => {
		res.statusCode = 401;
		res.json({
			msg: 'login failed => no token',
			err: err
		});
	});
});



module.exports = router;