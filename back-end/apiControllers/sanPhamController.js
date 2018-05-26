var express = require('express'),
	jwt = require('jsonwebtoken'),
	md5 = require('md5');
var sanPhamRepo = require('../repos/sanPhanRepo');

var router = express.Router();

router.get('/', (req, res) => {
	sanPhamRepo.loadAll().then(rows => {
		res.json(rows);
	}).catch(err => {
		console.log(err);
		res.statusCode = 500;
		res.end('View error log on console.');
	});
});

router.get('/', (req, res) => {
	sanPhamRepo.loadAll().then(rows => {
		res.json(rows);
	}).catch(err => {
		console.log(err);
		res.statusCode = 500;
		res.end('View error log on console.');
	});
});

router.get('/:id', (req, res) => {
	if (req.params.id) {
		var id = req.params.id;

		if (isNaN(id)) {
			res.statusCode = 400;
			res.end();
			return;
		}

		sanPhamRepo.load(id).then(rows => {
			if (rows.length > 0) {
				res.json(rows[0]);
			} else {
				res.statusCode = 204;
				res.end();
			}
		}).catch(err => {
			console.log(err);
			res.statusCode = 500;
			res.json('error');
		});
	} else {
		res.statusCode = 400;
		res.json('error');
	}
});

/*router.post('/', (req, res) => {
	var user = req.body.user;
	var pass = md5(req.body.pass);
	if (user != "" && pass != "") {
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
	}
	else {
		res.statusCode = 400;
		res.json('error');
	}
});*/

module.exports = router;