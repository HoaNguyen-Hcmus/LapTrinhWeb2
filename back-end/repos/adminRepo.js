var md5 = require('md5'),
	db = require('../fn/mysql');

exports.checkLogin = (user, pass) => {
	var sql = `SELECT * FROM admin, login 
		WHERE admin.ID = login.USER_ID 
		AND login.USERNAME = '${user}' AND login.PASSWORD = '${md5(pass)}'`;

	return db.load(sql);
};

//yeu cau ban
exports.showYeuCauBan = () => {
	var sql = `SELECT xb.*, user.NAME FROM xinduocban xb, user WHERE user.ID = xb.NguoiDung`;

	return db.load(sql);
};

exports.acceptYeuCauBan = (id) => {
	var sql = `Update xinduocban SET TrangThai = 1, ThoiGianChapNhan = Now() WHERE ID = ${id}`;
	return db.update(sql);
};

exports.declineYeuCauBan = (id) => {
	var sql = `DELETE FROM xinduocban WHERE Id = ${id}`;
	return db.delete(sql);
};

// quan li danh muc
exports.showDanhMuc = () => {
	var sql = `SELECT * FROM DanhMuc WHERE TrangThai = 1`;

	return db.load(sql);
};

exports.getDanhMuc = (id) => {
	var sql = `SELECT * FROM DanhMuc WHERE ID = ${id}`;

	return db.load(sql);
};

exports.addDanhMuc = (name) => {
	var sql = `INSERT INTO DanhMuc (Ten, TrangThai, NgayThem) VALUES ('${name}', 1, Now())`;

	return db.insert(sql);
};

exports.editDanhMuc = (id, name) => {
	var sql = `UPDATE DanhMuc Set Ten = '${name}', NgaySuaDoi = Now() WHERE ID = ${id}`;

	return db.update(sql);
};

exports.deleteDanhMuc = (id) => {
	var sql = `UPDATE DanhMuc Set TrangThai = '0' WHERE ID = ${id}`;

	return db.update(sql);
};

//quan li nguoi dung
exports.getNguoiDung = () => {
	var sql = `SELECT user.*, login.username FROM user, login WHERE login.USER_ID = user.ID AND user.status = 1`;

	return db.load(sql);
};

exports.deleteNguoiDung = (id) => {
	var sql = `Update User Set Status = '0' WHERE ID = ${id}`;

	return db.update(sql);
};

exports.getQuenMatKhau = () => {
	var sql = `SELECT * FROM CapLaiMatKhau req, user WHERE user.ID = req.NguoiDung`;

	return db.load(sql);
};

exports.acceptResetPass = (id) => {
	var sql = `UPDATE login SET PASSWORD = '${md5('123456')}' WHERE USER_ID = (SELECT NguoiDung FROM caplaimatkhau WHERE ID = ${id})`;

	return db.update(sql);
};

exports.deleteResetPass = (id) => {
	var sql = `DELETE FROM CapLaiMatKhau WHERE ID = ${id}`;

	return db.delete(sql);
}