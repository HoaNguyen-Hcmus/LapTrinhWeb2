var md5=require('md5');
var db= require('../fn/mysql');

exports.selectUser_ID=function()
{
	var sql=`select max(ID) as maxID from user`;
	return db.load(sql);
}

exports.checkUser=function(userName){
	var sql=`select * from  login where USERNAME = '${userName}'`;
	return db.load(sql);
}

exports.add=function(poco){
	var userID=exports.selectUser_ID();
	var md5_password=md5(poco.pass);
	var sql=`INSERT INTO user(NAME,ADDRESS,EMAIL,PHONE,TYPE) values ('${poco.name}','${poco.address}','${poco.mail}','${poco.phone}',${poco.type})`;
	return db.insert(sql);
}

exports.addLogin=function(poco,userID){
	var md5_password=md5(poco.pass);
	var sql=`INSERT INTO login (USERNAME,PASSWORD,USER_ID) values ('${poco.user}','${md5_password}',${userID})`; 
	return db.insert(sql);
}

exports.loadAll=function(){
	var sql='select * from user';
	return db.load(sql);
}

exports.xinban=function(poco){
	var sql=`INSERT INTO xinduocban(NguoiDung,ThoiGianXin,ThoiGianChapNhan,TrangThai) VALUES(${poco.userID},NOW(),null,0)`
	return db.insert(sql);
}
