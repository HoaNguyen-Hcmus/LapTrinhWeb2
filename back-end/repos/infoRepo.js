var md5=require('md5');
var db=require('../fn/mysql');

exports.selectUser=function(userID)
{
	var sql=`select * from user where ID=${userID}`;
	return db.load(sql);
}

exports.updateUser=function(userID,name,address,mail,phone)
{
	var sql=`update user set NAME=N'${name}',ADDRESS=N'${address}',EMAIL='${mail}',PHONE='${phone}' where ID=${userID}`;
	return db.insert(sql);

}

exports.selectPass=function(userID)
{
	var sql=`select * from login where USER_ID=${userID}`;
	return db.load(sql);
}

exports.updatePass=function(userID,pass)
{
	var md5_pass=md5(pass);
	var sql=`update login set PASSWORD='${md5_pass}' where USER_ID=${userID}`;
	return db.insert(sql);
}

exports.selectEvaluation=function(userID)
{
	var sql=`select (select NAME from user where ID=nx.NguoiNhanXet) as NAME, nx.LoiNhanXet,nx.ThoiGian,u.DiemDanhGia from  nhanxet nx,user u where nx.NguoiDuocNhanXet=${userID} and nx.NguoiDuocNhanXet=u.ID`;
	return db.load(sql);
}


exports.selectFavorite=function(userID)
{
	var sql=`select *,timediff(sp.ThoiHanBan,now())as hanban,(select count(SanPham) from daugia where SanPham=sp.ID)as SoLuotRaGia,
				(select max(GiaDuaRa) from daugia where SanPham=sp.ID)as GiaHienTai,
				(select NAME from user u,daugia where u.ID=NguoiRaGia and SanPham=sp.ID and GiaDuaRa=(select max(GiaDuaRa) from daugia where SanPham=sp.ID)) as NAME
				 from sanpham sp,danhsachyeuthich dsyt 
				 where dsyt.NguoiDung=${userID} and dsyt.SanPham=sp.ID `;
	return db.load(sql);
}

exports.selectAuction=function(userID)
{
	// var sql=`select DISTINCT sp.ID,sp.Ten 
	// 		from daugia dg,sanpham sp
	// 		 where NguoiRaGia=${userID} and dg.SanPham=sp.ID and sp.TrangThai=1 and timediff(ThoiHanBan,now())>0`;
	var sql=`select *,timediff(sp.ThoiHanBan,now())as hanban,(select count(SanPham) from daugia where SanPham=sp.ID)as SoLuotRaGia,
				(select max(GiaDuaRa) from daugia where SanPham=sp.ID)as GiaHienTai,
				(select NAME from user u,daugia where u.ID=NguoiRaGia and SanPham=sp.ID and GiaDuaRa=(select max(GiaDuaRa) from daugia where SanPham=sp.ID)) as NAME,
				if((select NAME from user where ID=dg.NguoiRaGia)like (select NAME from user u,daugia where u.ID=NguoiRaGia and SanPham=sp.ID and GiaDuaRa=(select max(GiaDuaRa) from daugia where SanPham=sp.ID)) ,'Giữ giá','Không giữ giá') as CoDungDau
				from daugia dg,sanpham sp
			 where NguoiRaGia=${userID} and dg.SanPham=sp.ID and sp.TrangThai=1 and timediff(ThoiHanBan,now())>0`;
	return db.load(sql);
}

exports.selectWin=function(userID)
{
	var sql=`select * 
			from daugia dg,sanpham sp, user u
			 where timediff(sp.ThoiHanBan,now())<=0 and NguoiRaGia=${userID} 
			 	and dg.SanPham=sp.ID and CoThangCuoc=1 and sp.NguoiBan= u.ID order by dg.GiaDuaRa desc`;
	return db.load(sql);
} 

exports.selectSanPham=function(id)
{
	var sql=`select * from  sanpham where ID=${id}`;
	return db.load(sql);
}

exports.insertComment=function(userIDGui,userIDNhan,nhanXet,trangThai,SanPham,LoaiNX)
{
	var sql=`insert into nhanxet(NguoiNhanXet,LoiNhanXet,NguoiDuocNhanXet,TrangThai,SanPham,LoaiNX) values (${userIDGui},'${nhanXet}',${userIDNhan},${trangThai},${SanPham},${LoaiNX})`;
	return db.insert(sql);
}

exports.updateDiem=function(userID,diem)
{
	var sql=`update user set DiemDanhGia=(select DiemDanhGia)+${diem} where ID=${userID}`;
	return db.insert(sql);
}

exports.selectNguoiBan=function(idSanPham)
{
	var sql=`select * from sanpham where ID=${idSanPham}`;
	return db.load(sql);
}

exports.selectSanPhamUserConHan=function(userID)
{
	var sql=`select *, timediff(ThoiHanBan,now()) as ThoiGianConLai from sanpham where NguoiBan=${userID} and timediff(ThoiHanBan,now())>0`;
	return db.load(sql);
}
exports.selectSanPhamDaBan=function(userID)
{
	var sql=`select * from daugia dg,sanpham sp where dg.SanPham=sp.ID and sp.NguoiBan=${userID} and timediff(sp.ThoiHanBan,now())<0 and dg.CoThangCuoc=1`;
	return db.load(sql);

}

exports.selectNguoiMua=function(idSanPham)
{
	var sql=`select dg.NguoiRaGia from daugia dg where dg.SanPham=${idSanPham} and dg.CoThangCuoc=1 `;
	return db.load(sql);
}