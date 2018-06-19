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
	var sql=`select * from  nhanxet nx,user u where nx.NguoiDuocNhanXet=${userID} and nx.NguoiDuocNhanXet=u.ID`;
	return db.load(sql);
}


exports.selectFavorite=function(userID)
{
	var sql=`select * from sanpham sp,danhsachyeuthich dsyt where dsyt.NguoiDung=${userID} and dsyt.SanPham=sp.ID `;
	return db.load(sql);
}

exports.selectAuction=function(userID)
{
	var sql=`select DISTINCT sp.Ten, sp.ID from daugia dg,sanpham sp where NguoiRaGia=${userID} and dg.SanPham=sp.ID and sp.TrangThai=1`;
	return db.load(sql);
}

exports.selectWin=function(userID)
{
	var sql=`select * from daugia dg,sanpham sp, user u where timediff(sp.ThoiHanBan,now())<=0 and NguoiRaGia=${userID} and dg.SanPham=sp.ID and CoThangCuoc=1 and sp.NguoiBan= u.ID order by dg.GiaDuaRa desc`;
	return db.load(sql);
} 

exports.selectSanPham=function(id)
{
	var sql=`select * from  sanpham where ID=${id}`;
	return db.load(sql);
}

exports.insertComment=function(userIDGui,userIDNhan,nhanXet,trangThai)
{
	var sql=`insert into nhanxet(NguoiNhanXet,LoiNhanXet,NguoiDuocNhanXet,TrangThai) values (${userIDGui},N'${nhanXet}',${userIDNhan},${trangThai})`;
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