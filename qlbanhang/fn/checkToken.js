var jwt = require('jsonwebtoken'),
	constants = require('./const');
exports.checkToken_Admin = (req, res, next) => {
	//console.log(req);
	var token = req.headers['x-access-token'];
	if(token) {
		jwt.verify(token, constants.SECRET_KEY_ADMIN, (err, payload) => {
			if(err) {
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

exports.checkToken_User = (req, res, next) => {
	//console.log(req);
	var token = req.headers['x-access-token'];
	if(token) {
		jwt.verify(token, constants.SECRET_KEY_USER, (err, payload) => {
			if(err) {
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