var db = require('../fn/mysql');

exports.loadAll = function() {
	var sql = 'select * from sanpham';
	return db.load(sql);
}

exports.loadOnce = function(id) {
	var sql = `SELECT user.DiemDanhGia, user.ID, sp.Ten, user.Name, sp.GiaDauGia, sp.GiaMuaNgay, sp.GioDang, sp.ThoiHanBan, sp.BuocGia, sp.NguoiBan, TIMESTAMPDIFF(SECOND, NOW(), sp.ThoiHanBan) AS 'ConLai' FROM sanpham sp, user WHERE user.ID = sp.NguoiBan AND sp.ID = ${id}`;
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
			WHERE dg.TrangThaiKick = 0 AND SanPham = ${sp}
	)`;

	return db.load(sql);
}

exports.loadSanPhamNhieuLuotRaGia = function() {
	var sql = `SELECT *, COUNT(*) as luotragia,max(g.GiaDuaRa) as giahientai FROM sanpham p, daugia g where p.ID = g.SanPham AND ThoiHanBan >= NOW() GROUP BY p.ID ORDER BY luotragia DESC LIMIT 5`;

	return db.load(sql);
}

exports.loadsanPhamYeuThichChoUser=function(userid,sanpham){
	var sql=`select * from danhsachyeuthich where NguoiDung=${userid} AND SanPham=${sanpham}`;
	return db.load(sql);
}

exports.addLikeList = function(nguoidung, sanpham) {
	var sql = `INSERT DanhSachYeuThich (NguoiDung, SanPham) VALUES (${nguoidung}, ${sanpham})`;

	return db.insert(sql);
}

exports.loadSanPhamGiaCao = function() {
	var sql = `SELECT *,max(GiaDuaRa) as giahientai FROM daugia d, sanpham s WHERE d.SanPham=s.ID AND ThoiHanBan >= NOW()  GROUP BY s.ID ORDER BY giahientai DESC LIMIT 5`;

	return db.load(sql);
}

exports.loadSanPhamGanKetThuc = function() {
	var sql = `SELECT *,max(GiaDuaRa) as giahientai FROM daugia d, sanpham s WHERE d.SanPham=s.ID AND ThoiHanBan >= NOW() GROUP BY s.ID ORDER BY ThoiHanBan ASC LIMIT 5`;

	return db.load(sql);
}

exports.loadDauGia = function(sp) {
	var sql = `SELECT sanpham.NguoiBan, user.NAME, daugia.ThoiGianDuaRa, daugia.GiaDuaRa, user.id
				FROM daugia, user, sanpham
				WHERE user.ID = daugia.NguoiRaGia AND sanpham.ID = daugia.SanPham 
					AND daugia.SanPham = ${sp} AND daugia.TrangThaiKick = 0`;

	return db.load(sql);
}

exports.dauGia = function(sanpham, nguoiragia, giaduara) {
	var sql = `INSERT INTO daugia(SanPham, NguoiRaGia, GiaDuaRa, TrangThaiKick, CoThangCuoc, ThoiGianDuaRa) VALUES (${sanpham},${nguoiragia},${giaduara}, 0, 0, NOW())`;

	return db.insert(sql);
}

exports.checkThoiGianBan = function(sanpham) {
	var sql = `SELECT TIMESTAMPDIFF(MINUTE, Now(), ThoiHanBan) AS 'ConLai' FROM sanpham WHERE ID = ${sanpham}`;

	return db.load(sql);
}

exports.giaHanThoiGianBan = function(sanpham) {
	var sql = `UPDATE SanPham SET ThoiHanBan = ADDTIME(ThoiHanBan, '0:5:0') WHERE ID = ${sanpham}`;

	return db.update(sql);
}

exports.updateTrangThaiDauGia = function(sanpham) {
	var sql = `UPDATE daugia SET cothangcuoc = 0 WHERE sanpham = ${sanpham}`;

	return db.update(sql);
}

exports.loadNguoiDung = function(user) {
	var sql = `SELECT * FROM User WHERE ID = ${user}`;

	return db.load(sql);
}

exports.loadNhanXet = function(user) {
	var sql = `SELECT NhanXet.*, user.NAME FROM NhanXet, user WHERE NguoiNhanXet = user.ID AND NguoiDuocNhanXet = ${user}`;

	return db.load(sql);
}