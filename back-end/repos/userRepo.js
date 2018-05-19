var md5=require('md5');
var db= require('../fn/mysql');

exports.add=function(poco){

	var md5_password=md5(poco.pass);

	var sql=`INSERT INTO user(NAME,ADDRESS,EMAIL,PHONE,TYPE) values ('${poco.name}','${poco.address}','${poco.mail}','${poco.phone}',${poco.type})`;
	 // var sql2=`INSERT INTO login (USERNAME,PASSWORD) values ('${poco.user}','${md5.pass}')`;
	 // db.insert(sql2);
	return db.insert(sql);
}

exports.loadAll=function(){
	var sql='select * from user';
	return db.load(sql);
}