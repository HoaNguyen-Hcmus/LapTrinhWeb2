var md5=require('md5');
var db= require('../fn/mysql'),
constants=require('../fn/const');

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

exports.loadUserXinBan=function(id){
	var sql=`select * from xinduocban where NguoiDung=${id}`;
	return db.load(sql);
}

exports.updateUserXinBan=function(id){
	var sql=`UPDATE xinduocban SET ThoiGianXin=NOW(), ThoiGianChapNhan=NULL, TrangThai=0 WHERE NguoiDung=${id}`;
	return db.update(sql);
}

exports.xinban=function(poco){
	var sql=`INSERT INTO xinduocban(NguoiDung,ThoiGianXin,ThoiGianChapNhan,TrangThai) VALUES(${poco.userID},NOW(),null,0)`;
	return db.insert(sql);
}
//Hòa thực hiện chức năng tìm kiếm 
//if(datediff(now(),sp.GioDang)<1,'<a  href="ChiTietSanPham?{{ID}}"><h4><span class="label label-success">{{Ten}}</span></h4></a>','<a  href="ChiTietSanPham?{{ID}}"><h4><span class="label label-warning">{{Ten}}</span></h4></a>') as khacbiet
exports.loadAllSanPhamTheoTimKiem=function(page,search){
	var offset = (page - 1) * constants.PRODUCTS_PER_PAGE;
    var sql = `select sp.Ten, sp.ID, sp.GiaMuaNgay, timediff(sp.ThoiHanBan,now()) as hanban, max(dg.GiaDuaRa) as giahientai, sp.SoLuotRaGia, u.NAME,datediff(now(),sp.GioDang) as moidang
    			,if(datediff(now(),sp.GioDang)<=1,"New","Old") as moi
    			from sanpham sp, daugia dg, user u
    			where sp.ID=dg.SanPham and u.ID=dg.NguoiRaGia and Ten like '%${search}%'
    			GROUP BY sp.Ten, sp.ID, sp.GiaMuaNgay,sp.SoLuotRaGia,u.NAME,dg.GiaDuaRa
    			limit ${constants.PRODUCTS_PER_PAGE + 1} offset ${offset}`;
    return db.load(sql);
}

exports.loadSanPhamTheoDanhMuc=function(page,danhmuc,search)
{
	var offset=(page-1)*constants.PRODUCTS_PER_PAGE;
	var sql=`select sp.Ten, sp.ID, sp.GiaMuaNgay, timediff(sp.ThoiHanBan,now()) as hanban, max(dg.GiaDuaRa) as giahientai, sp.SoLuotRaGia, u.NAME,datediff(now(),sp.GioDang) as moidang
    			,if(datediff(now(),sp.GioDang)<=1,"New","Old") as moi
    			from sanpham sp, daugia dg, user u
    			where sp.ID=dg.SanPham and u.ID=dg.NguoiRaGia and Ten like '%${search}%' and  DanhMuc=${danhmuc}
    			GROUP BY sp.Ten, sp.ID, sp.GiaMuaNgay,sp.SoLuotRaGia,u.NAME,dg.GiaDuaRa
    			limit ${constants.PRODUCTS_PER_PAGE + 1} offset ${offset}`;
	return db.load(sql);
}

exports.loadSanPhamTheoSapXep=function(page,search,danhmuc,sapxep){
	var offset=(page-1)*constants.PRODUCTS_PER_PAGE;
	var sql="";
    if(danhmuc!=0)
    {
        if(sapxep==1){
            sql=`select sp.Ten, sp.ID, sp.GiaMuaNgay, timediff(sp.ThoiHanBan,now()) as hanban, max(dg.GiaDuaRa) as giahientai, sp.SoLuotRaGia, u.NAME,datediff(now(),sp.GioDang) as moidang
                 ,if(datediff(now(),sp.GioDang)<=1,"New","Old") as moi
                 from sanpham sp, daugia dg, user u
                 where sp.ID=dg.SanPham and u.ID=dg.NguoiRaGia and Ten like '%${search}%' and  DanhMuc=${danhmuc}
                 GROUP BY sp.Ten, sp.ID, sp.GiaMuaNgay,sp.SoLuotRaGia,u.NAME,dg.GiaDuaRa
                 order by sp.ThoiHanBan desc
                 limit ${constants.PRODUCTS_PER_PAGE + 1} offset ${offset}`;
        }
        if(sapxep==2){
            sql=`select sp.Ten, sp.ID, sp.GiaMuaNgay, timediff(sp.ThoiHanBan,now()) as hanban, max(dg.GiaDuaRa) as giahientai, sp.SoLuotRaGia, u.NAME,datediff(now(),sp.GioDang) as moidang
                 ,if(datediff(now(),sp.GioDang)<=1,"New","Old") as moi
                 from sanpham sp, daugia dg, user u
                 where sp.ID=dg.SanPham and u.ID=dg.NguoiRaGia and Ten like '%${search}%' and  DanhMuc=${danhmuc}
                 GROUP BY sp.Ten, sp.ID, sp.GiaMuaNgay,sp.SoLuotRaGia,u.NAME,dg.GiaDuaRa
                 order by dg.GiaDuaRa asc
                 limit ${constants.PRODUCTS_PER_PAGE + 1} offset ${offset}`;
        }
        if(sapxep==0){
            sql=`select sp.Ten, sp.ID, sp.GiaMuaNgay, timediff(sp.ThoiHanBan,now()) as hanban, max(dg.GiaDuaRa) as giahientai, sp.SoLuotRaGia, u.NAME,datediff(now(),sp.GioDang) as moidang
                 ,if(datediff(now(),sp.GioDang)<=1,"New","Old") as moi
                 from sanpham sp, daugia dg, user u
                 where sp.ID=dg.SanPham and u.ID=dg.NguoiRaGia and Ten like '%${search}%' and  DanhMuc=${danhmuc}
                 GROUP BY sp.Ten, sp.ID, sp.GiaMuaNgay,sp.SoLuotRaGia,u.NAME,dg.GiaDuaRa
                 limit ${constants.PRODUCTS_PER_PAGE + 1} offset ${offset}`;
        }
    }
    else{
        if(sapxep==1){
            sql=`select sp.Ten, sp.ID, sp.GiaMuaNgay, timediff(sp.ThoiHanBan,now()) as hanban, max(dg.GiaDuaRa) as giahientai, sp.SoLuotRaGia, u.NAME,datediff(now(),sp.GioDang) as moidang
                 ,if(datediff(now(),sp.GioDang)<=1,"New","Old") as moi
                 from sanpham sp, daugia dg, user u
                 where sp.ID=dg.SanPham and u.ID=dg.NguoiRaGia and Ten like '%${search}%'
                 GROUP BY sp.Ten, sp.ID, sp.GiaMuaNgay,sp.SoLuotRaGia,u.NAME,dg.GiaDuaRa
                 order by sp.ThoiHanBan desc
                 limit ${constants.PRODUCTS_PER_PAGE + 1} offset ${offset}`;
        }
        if(sapxep==2){
            sql=`select sp.Ten, sp.ID, sp.GiaMuaNgay, timediff(sp.ThoiHanBan,now()) as hanban, max(dg.GiaDuaRa) as giahientai, sp.SoLuotRaGia, u.NAME,datediff(now(),sp.GioDang) as moidang
                 ,if(datediff(now(),sp.GioDang)<=1,"New","Old") as moi
                 from sanpham sp, daugia dg, user u
                 where sp.ID=dg.SanPham and u.ID=dg.NguoiRaGia and Ten like '%${search}%'
                 GROUP BY sp.Ten, sp.ID, sp.GiaMuaNgay,sp.SoLuotRaGia,u.NAME,dg.GiaDuaRa
                 order by dg.GiaDuaRa asc
                 limit ${constants.PRODUCTS_PER_PAGE + 1} offset ${offset}`;
        }
        if(sapxep==0){
            sql=`select sp.Ten, sp.ID, sp.GiaMuaNgay, timediff(sp.ThoiHanBan,now()) as hanban, max(dg.GiaDuaRa) as giahientai, sp.SoLuotRaGia, u.NAME,datediff(now(),sp.GioDang) as moidang
                 ,if(datediff(now(),sp.GioDang)<=1,"New","Old") as moi
                 from sanpham sp, daugia dg, user u
                 where sp.ID=dg.SanPham and u.ID=dg.NguoiRaGia and Ten like '%${search}%'
                 GROUP BY sp.Ten, sp.ID, sp.GiaMuaNgay,sp.SoLuotRaGia,u.NAME,dg.GiaDuaRa
                 limit ${constants.PRODUCTS_PER_PAGE + 1} offset ${offset}`;
        }
    }
	
	return db.load(sql);
}

exports.selectAllDanhMuc=function(){
	var sql=`select * from danhmuc where trangthai = 1`;
	return db.load(sql);
}

//-------------------------------------------------------------
