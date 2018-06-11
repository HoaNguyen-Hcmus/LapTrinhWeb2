var db = require('../fn/mysql');

exports.loadAll = function() {
	var sql = 'select * from sanpham';
	return db.load(sql);
}

exports.loadOnce = function(id) {
	var sql = `SELECT user.DiemDanhGia, user.ID, sp.Ten, user.Name, sp.GiaMuaNgay, sp.GioDang, sp.ThoiHanBan FROM sanpham sp, user WHERE user.ID = sp.NguoiBan AND sp.ID = ${id}`;
	return db.load(sql);
}

exports.loadMoTa = function(id) {
	var sql = `SELECT * FROM MoTa WHERE SanPham = ${id}`;

	return db.load(sql);
}

exports.loadNguoiGiuGia = function(sp) {
	var sql = `SELECT dg.GiaDuaRa, u.NAME, u.ID, u.DiemDanhGia
			FROM daugia dg, user u
			WHERE dg.NguoiRaGia = u.ID AND dg.SanPham = ${sp} AND dg.GiaDuaRa = (
			SELECT Max(GiaDuaRa)
			FROM daugia
			WHERE SanPham = ${sp}
	)`;

	return db.load(sql);
}