var db = require('../fn/mysql');

exports.loadAll = function() {
	var sql = 'select * from sanpham';
	return db.load(sql);
}

exports.load = function(id) {
	var sql = `SELECT p.ID,p.Ten,p.GiaMuaNgay,p.GiaDauGia,p.GioDang,p.ThoiHanBan,u.NAME AS NguoiBan,u2.NAME AS NguoiRaGia,m.MoTa,d.GiaDuaRa FROM sanpham p, user u,user u2, mota m, daugia d where p.ID=d.SanPham and p.ID=m.SanPham and u.ID=p.NguoiBan and u2.ID=d.NguoiRaGia and d.CoThangCuoc=1 and p.ID = '${id}'`;
	return db.load(sql);
}