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
		html='<option value="0">Lựa chọn danh mục</option>';
		$(data.danhmuc).each(function(index,val){
			html+='<option value="'+val.ID+'">'+val.Ten+'</option>';
		});
		$('#danhmuc').html(html);
	}).fail(function(){
		console.log('error');
	});
	///
});



// Hòa thực hiện chức năng tìm kiếm ------------------------------------------------------------------------
	var CUR_PAGE = 1;
	$("#btn-search").on('click',function(){
		$("#content2").html(htmlSearch);
	});

var htmlSearch=`<!DOCTYPE html>
<html>
<head>
	<title>Tìm kiếm</title>
	<meta charset="utf-8">
	<link rel="stylesheet" type="text/css" href="css/bootstrap.min.css">
	<style type="text/css">
		.loader {
		    border: 8px solid #f3f3f3; /* Light grey */
		    border-top: 8px solid #3498db; /* Blue */
		    border-radius: 50%;
		    width: 80px;
		    height: 80px;
		    animation: spin 2s linear infinite;
		    margin: 0 auto;
		    display: none;
		}
	
		@keyframes spin {
		    0% { transform: rotate(0deg); }
		    100% { transform: rotate(360deg); }
		}
	</style>
</head>
<body>

	<div class="container-fluid">
		<div class="row">
			<div class="col-sm-9 col-md-9">
				<div class="panel panel-default">
					<div class="panel-heading">
						<h3 class="panel-title">Tìm kiếm</h3>
					</div>
					<div class="panel-body">
						<div class="row" id="sanpham-list">
							
						</div>
						<div class="loader"></div>
						<div class="row">
							<br>
							<div class="col-sm-12 col-md-12">
								<button id="btnMore" name="btnMore" type="button" class="btn btn-large btn-block btn-success">
									<h4>Load more...</h4>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<script id="sanpham-template" type="text/x-handlebars-template">
		{{#each this}}
		<div class="col-sm-4 col-md-4" style="display: none">
			<div class="thumbnail">
				<img src="http://localhost:3000/{{ID}}/image1.png" class="img-responsive" alt="Image">
				<div class="caption">
					<a href="ChiTietSanPham.html?id={{ID}}"><h4><span class="label label-success">{{Ten}}</span><span class="badge">{{moi}}</span></h4></a>
					<h5>Giá hiện tại: {{giahientai}}</h5>
					<h5>Giá mua ngay: {{GiaMuaNgay}}</h5>
					<h5>Thời gian còn lại : {{hanban}} phút</h5>
					<h5>Số lượt ra giá : {{SoLuotRaGia}}</h5>
					<p style="height: 36px;">Người đang giữ giá: {{NAME}}</p>
					<p>
						<a href="ChiTietSanPham.html?id={{ID}}" class="btn btn-primary" class="btn btn-primary">
						<span class="glyphicon glyphicon-eye-open"></span>
						Details 
						</a> 
						<a href="javascript:;" data-id="{{ID}}" class="btn btn-warning btn-like-list">
						<span class="glyphicon glyphicon-heart"></span>
						 Yêu thích
						</a>
					</p>
				</div>
			</div>
		</div>
		{{/each}}
	</script>
	
	
	<script src="js/bootstrap-3.3.7-dist/js/bootstrap.min.js"></script>
	<script src="js/handlebars.min-v4.0.11.js"></script>
	<script src="js/handlebars-intl-1.1.2/handlebars-intl.min.js"></script>
	<script src="js/jquery-3.3.1.min.js"></script>
	<script src="js/bootstrap.min.js"></script>
	<script src="js/me/function.js"></script>
	<script src="js/me/index.js"></script>
	<script src="js/swal.js"></script>
</body>
</html>`;

	$(function() {
		    HandlebarsIntl.registerWith(Handlebars);
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
        var source = $('#sanpham-template').html();
        var template = Handlebars.compile(source);
        var html = template(data.sanpham);
        $('#sanpham-list').append(html);
        
        $('#sanpham-list div[style]').fadeIn(200, function() {
            $(this).removeAttr('style');
        });

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
	//console.log(jsonPost);

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

	//console.log(jsonPost);
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