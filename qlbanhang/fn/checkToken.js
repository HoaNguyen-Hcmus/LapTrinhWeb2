<<<<<<< HEAD
﻿var jwt = require('jsonwebtoken'),
	constants = require('./const');
exports.checkTokenAdmin = (req, res, next) => {
=======
var jwt = require('jsonwebtoken'),
	constants = require('./const');
exports.checkToken_Admin = (req, res, next) => {
>>>>>>> Huy
	//console.log(req);
	var token = req.headers['x-access-token'];
	if(token) {
		jwt.verify(token, constants.SECRET_KEY_ADMIN, (err, payload) => {
			if(err) {
<<<<<<< HEAD
				console.log(err);
=======
>>>>>>> Huy
				res.statusCode = 401;
				res.json({
					mess: err.message,
					error: err.name
				});
			} else {
				res.statusCode = 200;
				req.tokenPayload = payload;
				next();
			}
		});
	} else {
		res.statusCode = 403;
		res.json({
			mess: "Không tìm thấy token",
			error: "Lỗi token"
		});
	}
};

<<<<<<< HEAD
exports.checkTokenUser = (req, res, next) => {
=======
exports.checkToken_User = (req, res, next) => {
>>>>>>> Huy
	//console.log(req);
	var token = req.headers['x-access-token'];
	if(token) {
		jwt.verify(token, constants.SECRET_KEY_USER, (err, payload) => {
			if(err) {
<<<<<<< HEAD
				console.log(err);
=======
>>>>>>> Huy
				res.statusCode = 401;
				res.json({
					mess: err.message,
					error: err.name
				});
			} else {
				res.statusCode = 200;
				req.tokenPayload = payload;
				next();
			}
		});
	} else {
		res.statusCode = 403;
		res.json({
			mess: "Không tìm thấy token",
			error: "Lỗi token"
		});
	}
};