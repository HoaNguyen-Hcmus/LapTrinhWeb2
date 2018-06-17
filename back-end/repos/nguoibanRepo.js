var db = require('../fn/mysql');

exports.checkNguoiBan = function(id) {
	var sql = `SELECT * FROM xinduocban WHERE NguoiDung = ${id} AND TrangThai = 1`;
	return db.load(sql);
}

exports.showDanhMuc = function() {
	var sql = `SELECT ID, Ten FROM DanhMuc WHERE TrangThai = 1`;
	return db.load(sql);
}

exports.showMoTa = function(sp) {
	var sql = `SELECT * FROM MoTa WHERE SanPham = ${sp}`;
	return db.load(sql);
}
exports.dangBan = function(data) {
	var sql = `INSERT SanPham(Ten, GiaDauGia, GiaMuaNgay, ThoiHanBan, TrangThai, 
		NguoiBan, SoLuotRaGia, DanhMuc, BuocGia, TuDongGiaHan)
		VALUES ('${data.ten}', ${data.giakhoidiem}, ${data.giamuangay}, '${data.thoihanban}', 1,
		${data.nguoiban}, 0, ${data.danhmuc}, ${data.buocgia}, ${data.tudonggiahan})`;
	return db.insert(sql);
}

exports.dangMoTa = function(sanpham, mota) {
	var sql = `INSERT mota (SanPham, MoTa) VALUES (${sanpham}, '${mota}')`;
	return db.insert(sql);
}

exports.getNewId = function() {
	var sql = `SELECT Max(ID)+1 AS 'NewID', Max(ID)+2 AS 'NewID2' FROM SanPham`;
	return db.load(sql);
}

exports.kickuser = function(sp, user) {
	var sql = `Update DauGia Set TrangThaiKick = 1 WHERE SanPham = ${sp} AND NguoiRaGia = ${user}`;

	console.log(sql);

	return db.update(sql);
}