var mysql = require('mysql'),
	q = require('q');

const 	HOST = 'localhost',
		USER = 'root',
		PWD = '',
		PORT = '3306',
		DB = 'qlbanhang';

exports.load = (sql) => {
	var d = q.defer();

	var cn = mysql.createConnection({
		host: HOST,
		port: PORT,
		user: USER,
		password: PWD,
		database: DB
	});

	cn.connect();
	cn.query(sql, function (error, rows, fields) {
		if (error) {
			d.reject(error);
		} else {
			d.resolve(rows);
		}

		cn.end();
	});

	return d.promise;
}


exports.insert = (sql) => {
	var d = q.defer();
	
	var cn = mysql.createConnection({
		host: HOST,
		port: PORT,
		user: USER,
		password: PWD,
		database: DB
	});

	cn.connect();
	cn.query(sql, function (error, value) {
		if (error) {
			d.reject(error);
		} else {
			d.resolve(value.insertId);
		}

		cn.end();
	});

	return d.promise;
}

exports.update = (sql) => {
	var d = q.defer();
	
	var cn = mysql.createConnection({
		host: HOST,
		port: PORT,
		user: USER,
		password: PWD,
		database: DB
	});

	cn.connect();
	cn.query(sql, function (error, value) {
		if (error) {
			d.reject(error);
		} else {
			d.resolve(value.changedRows);
		}

		cn.end();
	});

	return d.promise;
}

exports.delete = function (sql) {
	var d = q.defer();
	
	var cn = mysql.createConnection({
		host: HOST,
		port: PORT,
		user: USER,
		password: PWD,
		database: DB
	});

	cn.connect();
	cn.query(sql, function (error, value) {
		if (error) {
			d.reject(error);
		} else {
			d.resolve(value.affectedRows);
		}

		cn.end();
	});

	return d.promise;	
}