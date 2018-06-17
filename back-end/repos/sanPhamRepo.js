var db = require('../fn/mysql');

exports.loadAll = function() {
	var sql = 'select * from sanpham';
	return db.load(sql);
}

exports.loadOnce = function(id) {
	var sql = `SELECT user.DiemDanhGia, user.ID, sp.Ten, user.Name, sp.GiaDauGia, sp.GiaMuaNgay, sp.GioDang, sp.ThoiHanBan, sp.BuocGia FROM sanpham sp, user WHERE user.ID = sp.NguoiBan AND sp.ID = ${id}`;
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
	var sql = `SELECT *, COUNT(*) as luotragia FROM sanpham p, daugia g where p.ID = g.SanPham AND ThoiHanBan >= NOW() GROUP BY p.ID ORDER BY luotragia DESC LIMIT 5`;

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
	var sql = `SELECT * FROM sanpham WHERE ThoiHanBan >= NOW() ORDER BY ThoiHanBan ASC LIMIT 5`;

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