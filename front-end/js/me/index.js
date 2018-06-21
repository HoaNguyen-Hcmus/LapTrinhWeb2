$("#btn-loguot").on('click', function () {
	localStorage.removeItem('access_token');
	localStorage.removeItem('id_token');
	localStorage.removeItem('user_token');
	localStorage.removeItem('banhang_token');
	window.location = "index.html";
});

$(document).ready(function () {
	if (localStorage.user_token != undefined) {
		$("#user").html(localStorage.user_token);
		$("#logouted").remove();
	} else {
		$("#logined").remove();
	}
	loadTop5RaGia();
	loadTop5Gia();
	loadTop5GanKetThuc();
	btnXinban();
	//Hòa nguyễn thực hiện load danh mục
	$.ajax({
		url: 'http://localhost:3000/search/danhmuc',
		dataType:'json',
		type:'GET'
	}).done(function(data){
		var xhtml = "";
		html='<option value="0">Lựa chọn danh mục</option>';
		$(data.danhmuc).each(function(index,val){
			html+='<option value="'+val.ID+'">'+val.Ten+'</option>';
			xhtml+= '<li class="list-group-item"> ' + val.Ten + '</li>';
		});


		$('#list-danhmuc').html(xhtml);
		$('#danhmuc').html(html);
	}).fail(function(){
		console.log('error');
	});
	///
});



// Hòa thực hiện chức năng tìm kiếm ------------------------------------------------------------------------
	var CUR_PAGE = 1;
	$("#btn-search").on('click',function(){
		//$("#content2").html(htmlSearch);
		
		
		$('#Top5RaGia-title').html('tìm kiếm');
		$('#Top5RaGia-list').empty();
		$('#Top5Gia').hide();
		$('#Top5GanKetThuc').hide();
		$('#btnMore').show();
		loadSanPham();
	});

	$('#btnMore').on('click', function() {
	     loadSanPham();
	});
var layDanhMuc=0;
var loadSanPham = function() {
    $('.loader').show();
    if(($("#danhmuc").val())!=0)
    {
    	layDanhMuc=$("#danhmuc").val();
    }
    var data={
    	danhmuc:layDanhMuc,
    	txtSearch:$("#txtSearch").val(),
    	sapxep: $("#sapxep").val()
    }
    $.ajax({
        url: 'http://localhost:3000/search/sanpham?page=' + CUR_PAGE+'&danhmuc='+data.danhmuc+'&txtSearch='+data.txtSearch+'&sapxep='+data.sapxep,
        dataType: 'json',
        timeout: 10000,
        type:'GET'
        //data: JSON.stringify(data)
    }).done(function(data) {
		$.each(data.sanpham, function (idx, item) {
		cont='<div class="col-sm-4 col-md-4">'+
		'	<div class="thumbnail">'+
		'		<img src="http://localhost:3000/'+item.ID+'/image1.png" class="img-responsive" alt="Image">'+
		'		<div class="caption">'+
		'			<a href="ChiTietSanPham.html?id='+item.ID+'"><h4><span class="label label-success">'+item.Ten+'</span><span class="badge">'+item.moi+'</span></h4></a>'+
		'			<h5>Giá hiện tại: '+item.giahientai+'</h5>'+
		'			<h5>Giá mua ngay: '+item.GiaMuaNgay+'</h5>'+
		'			<h5>Thời gian còn lại : '+item.hanban+' phút</h5>'+
		'			<h5>Số lượt ra giá : '+item.SoLuotRaGia+'</h5>'+
		'			<p style="height: 36px;">Người đang giữ giá: '+item.NAME+'</p>'+
		'			<p>'+
		'				<a href="ChiTietSanPham.html?id='+item.ID+'" class="btn btn-primary" class="btn btn-primary">'+
		'				<span class="glyphicon glyphicon-eye-open"></span>'+
		'				Details '+
		'				</a> '+
		'				<a href="javascript:;" data-id="'+item.ID+'" class="btn btn-warning btn-like-list">'+
		'				<span class="glyphicon glyphicon-heart"></span>'+
		'				 Yêu thích'+
		'				</a>'+
		'			</p>'+
		'		</div>'+
'			</div>'+
'		</div>'
		$('#Top5RaGia-list').append(cont);
		});
        
        // $('#Top5RaGia-list[style]').fadeIn(200, function() {
        //     $(this).removeAttr('style');
        // });

        CUR_PAGE++;
        if (data.hasMore === false) {
            $('#btnMore').hide();
        }

        $('.loader').hide();
    });
};
//---------------
// ------------------------------------------------------------------------------


var loadTop5RaGia = function () {
	
	$('#btnMore').hide();
	$('.loader').show();

	$.ajax({
		url: 'http://localhost:3000/sanpham/top/ragia',
		dataType: 'json',
		timeout: 10000
	}).done(function (data) {
		$.each(data, function (idx, item) {
			var html = '<div class="col-sm-2 col-md-2" style="display: none>' +
				'<div class="thumbnail">' +
				'<img src="http://localhost:3000/' + item.SanPham + '/image1.png" alt="' + item.Ten + '" title="' + item.Ten + '" class="img-responsive" alt="Cinque Terre">' +
				'<li class="list-group-item">Giá hiện tại: '+ formatCurrent(item.giahientai) +'</li>'+
				'<li class="list-group-item">Thời điểm kết thúc: '+getFullDate(item.ThoiHanBan)+'</li>'+
				'<div class="caption">' +
				'<h4>' + item.Ten + '</h4>' +
				'<p>' +
				'<a href="ChiTietSanPham.html?id='+item.SanPham+'" class="btn btn-primary">' +
				'<span class="glyphicon glyphicon-eye-open"></span>' +
				'Details' +
				'</a>' +
				' <a href="javascript:;" data-id="'+item.SanPham+'" class="btn btn-warning btn-like-list">' +
				'<span class="glyphicon glyphicon-heart"></span>' +
				' Yêu thích'+
				'</a>' +
				'</p>' +
				'</div>' +
				'</div>' +
				'</div>';
			//console.log(html);
			$('#Top5RaGia-list').append(html);

			$('#Top5RaGia-list div[style]').fadeIn(1000, function () {
				$(this).removeAttr('style');
			});

			if (data.hasMore === false) {
				$('#btnMore').hide();
			}

			$('.loader').hide();
		});
	});
};

var loadTop5Gia = function () {
	$('.loader').show();

	$.ajax({
		url: 'http://localhost:3000/sanpham/top/gia',
		dataType: 'json',
		timeout: 10000
	}).done(function (data) {
		$.each(data, function (idx, item) {
			var html = '<div class="col-sm-2 col-md-2" style="display: none>' +
				'<div class="thumbnail">' +
				'<img src="http://localhost:3000/' + item.SanPham + '/image1.png" alt="' + item.Ten + '" title="' + item.Ten + '" class="img-responsive" alt="Cinque Terre">' +
				'<li class="list-group-item">Giá hiện tại: '+ formatCurrent(item.giahientai) +'</li>'+
				'<li class="list-group-item">Thời điểm kết thúc: '+getFullDate(item.ThoiHanBan)+'</li>'+
				'<div class="caption">' +
				'<h4>' + item.Ten + '</h4>' +
				'<p>' +
				'<a href="ChiTietSanPham.html?id='+item.SanPham+'" class="btn btn-primary" class="btn btn-primary">' +
				'<span class="glyphicon glyphicon-eye-open"></span>' +
				'Details' +
				'</a>' +
				' <a href="javascript:;" data-id="'+item.SanPham+'" class="btn btn-warning btn-like-list">' +
				'<span class="glyphicon glyphicon-heart"></span>' +
				' Yêu thích' +
				'</a>' +
				'</p>' +
				'</div>' +
				'</div>' +
				'</div>';
			//console.log(html);
			$('#Top5Gia-list').append(html);

			$('#Top5Gia-list div[style]').fadeIn(1000, function () {
				$(this).removeAttr('style');
			});

			if (data.hasMore === false) {
				$('#btnMore').hide();
			}

			$('.loader').hide();
		});
	});
};

var loadTop5GanKetThuc = function () {
	$('.loader').show();

	$.ajax({
		url: 'http://localhost:3000/sanpham/top/ganketthuc',
		dataType: 'json',
		timeout: 10000
	}).done(function (data) {
		$.each(data, function (idx, item) {
			var html = '<div class="col-sm-2 col-md-2" style="display: none>' +
				'<div class="thumbnail">' +
				'<img src="http://localhost:3000/' + item.SanPham + '/image1.png" alt="' + item.Ten + '" title="' + item.Ten + '" class="img-responsive" alt="Cinque Terre">' +
				'<li class="list-group-item">Giá hiện tại: '+ formatCurrent(item.giahientai) +'</li>'+
				'<li class="list-group-item">Thời điểm kết thúc: '+getFullDate(item.ThoiHanBan)+'</li>'+
				'<div class="caption">' +
				'<h4>' + item.Ten + '</h4>' +
				'<p>' +
				'<a href="ChiTietSanPham.html?id='+item.SanPham+'" class="btn btn-primary" class="btn btn-primary">' +
				'<span class="glyphicon glyphicon-eye-open"></span>' +
				'Details' +
				'</a>' +
				' <a href="javascript:;" data-id="'+item.SanPham+'" class="btn btn-warning btn-like-list">' +
				'<span class="glyphicon glyphicon-heart"></span>' +
				' Yêu thích' +
				'</a>' +
				'</p>' +
				'</div>' +
				'</div>' +
				'</div>';
			$('#Top5GanKetThuc-list').append(html);

			$('#Top5GanKetThuc-list div[style]').fadeIn(1000, function () {
				$(this).removeAttr('style');
			});

			if (data.hasMore === false) {
				$('#btnMore').hide();
			}

			$('.loader').hide();
		});
	});
};

$("#content2").on('click', '.btn-like-list', function() {
	var dataPost = {
		NguoiDung: localStorage.id_token,
		SanPham: $(this).data("id")
	}, 
	jsonPost = JSON.stringify(dataPost);

	$.ajax({
		url: 'http://localhost:3000/sanpham/addLikeList',
		type: 'POST',
		dataType: 'json',
		data: jsonPost,
		headers: {
			'x-access-token': localStorage.access_token
		},
		contentType: 'application/json'
	})
	.done(function(data) {
		swal("success", "Thêm vào danh sách thành công", "success");
	})
	.fail(function(err) {
		if(err.status == 403){
			window.location.href = 'login.html';
		} else if(err.status == 500) {
			swal("Lỗi", "Thêm vào danh sách không thành công", "error");
		}
	});
});

$("#content2").on('click', '.btn-xin-ban', function() {
	var dataPost = {
		userID: localStorage.id_token,
	}, 
	jsonPost = JSON.stringify(dataPost);

	console.log(jsonPost);
	$.ajax({
		url: 'http://localhost:3000/Signup/xinban',
		type: 'POST',
		dataType: 'json',
		headers: {
			"x-access-token": localStorage.access_token
		},
		data: jsonPost,
		contentType: 'application/json'
	})
	.done(function(data) {
		if(data.xinBan==1){
			swal("success", "Xin được bán thành công", "success");
		}
		if(data.xinBan==2){
			swal("success", "Xin gia hạn bán thành công", "success");
		}
	})
	.fail(function(err) {
		console.log(err);
		if(err.status == 403){
			window.location.href = 'login.html';
		} else if(err.status == 500) {
			swal("Lỗi", "Xin được bán không thành công", "error");
		}
	});
});

var btnXinban = function () {
	var id = localStorage.id_token;
	if(localStorage.id_token != undefined){
		$(' <button type="button" class="btn btn-success btn-xin-ban">Xin được bán</button>').insertAfter('#DangSP');
	}
};