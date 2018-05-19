var express = require('express'),
	jwt = require('jsonwebtoken'),
	md5 = require('md5');
var loginRepo = require('../repos/loginRepo');
var checkToken = require('../fn/checkToken');
var c = require('../fn/const');

var router = express.Router();

router.get('/', (req, res) => {
	loginRepo.loadAll().then(rows => {
		res.json(rows);
	}).catch(err => {
		console.log(err);
		res.statusCode = 500;
		res.end('View error log on console.');
	});
});

router.post('/', (req, res) => {
	var user = req.body.user;
	var pass = md5(req.body.pass);
	loginRepo.load(user).then(rows => {
		if (user === rows[0].USERNAME && pass === rows[0].PASSWORD) {
			// var token = 'access_token';

			var payload = {
				user: user,
				info: 'for you'
			}
			var token = jwt.sign(payload, c.SECRET_KEY_USER, {
				expiresIn: 120
			});

			res.json({
				access_token: token
			});
		} else {
			res.statusCode = 401;
			res.json({
				msg: 'login failed => no token'
			});
		}
	}).catch(err => {
		console.log(err);
		res.statusCode = 500;
		res.json('error');
	});
});

module.exports = router;