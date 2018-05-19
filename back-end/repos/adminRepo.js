var md5 = require('md5'),
	db = require('../fn/mysql');

exports.checkLogin = (user, pass) => {
	var sql = `SELECT * FROM admin, login 
		WHERE admin.ID = login.USER_ID 
		AND login.USERNAME = '${user}' AND login.PASSWORD = '${md5(pass)}'`;

	return db.load(sql);
};

