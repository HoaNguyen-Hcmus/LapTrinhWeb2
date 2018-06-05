var db = require('../fn/mysql'),
	md5 = require('md5');

exports.load = function(uname, pass) {
	var sql = `select login.USERNAME, login.PASSWORD, user.ID, user.NAME 
				from login, user 
				WHERE user.ID = login.USER_ID AND login.username = '${uname}' 
				and login.password = '${md5(pass)}'`;
	return db.load(sql);
}

exports.checkBanHang = function(user) {
	var sql = `SELECT *, DateDiff(Now(), ThoiGianChapNhan) AS 'ThoiGianConLai' FROM xinduocban WHERE NguoiDung = ${user} AND TrangThai = 1`;

	return db.load(sql);
}