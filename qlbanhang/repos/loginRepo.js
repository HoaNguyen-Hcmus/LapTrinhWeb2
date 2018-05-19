var db = require('../fn/mysql');

exports.loadAll = function() {
	var sql = 'select * from login';
	return db.load(sql);
}

exports.load = function(uname) {
	var sql = `select * from login where username = '${uname}'`;
	return db.load(sql);
}
