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
});

var loadTop5RaGia = function () {
	$('.loader').show();

	$.ajax({
		url: 'http://localhost:3000/sanpham/top/ragia',
		dataType: 'json',
		timeout: 10000
	}).done(function (data) {
		$.each(data, function (idx, item) {
			var html = '<div class="col-sm-4 col-md-4" style="display: none>' +
				'<div class="thumbnail">' +
				'<img src="http://localhost:3000/' + item.ID + '/image1.png" alt="' + item.Ten + '" title="' + item.Ten + '">' +
				'<div class="caption">' +
				'<h4>' + item.Ten + '</h4>' +
				'<p>' +
				'<a href="ChiTietSanPham.html?id='+item.ID+'" class="btn btn-primary">' +
				'<span class="glyphicon glyphicon-eye-open"></span>' +
				'Details' +
				'</a>' +
				' <a href="javascript:;" data-id="'+item.ID+'" class="btn btn-warning btn-like-list">' +
				'<span class="glyphicon glyphicon-heart"></span>' +
				' Yêu thích'+
				'</a>' +
				'</p>' +
				'</div>' +
				'</div>' +
				'</div>';
			console.log(html);
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
			var html = '<div class="col-sm-4 col-md-4" style="display: none>' +
				'<div class="thumbnail">' +
				'<img src="http://localhost:3000/' + item.ID + '/image1.png" alt="' + item.Ten + '" title="' + item.Ten + '">' +
				'<div class="caption">' +
				'<h4>' + item.Ten + '</h4>' +
				'<p>' +
				'<a href="ChiTietSanPham.html?id='+item.ID+'" class="btn btn-primary" class="btn btn-primary">' +
				'<span class="glyphicon glyphicon-eye-open"></span>' +
				'Details' +
				'</a>' +
				' <a href="javascript:;" data-id="'+item.ID+'" class="btn btn-warning btn-like-list">' +
				'<span class="glyphicon glyphicon-heart"></span>' +
				' Yêu thích' +
				'</a>' +
				'</p>' +
				'</div>' +
				'</div>' +
				'</div>';
			console.log(html);
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
			var html = '<div class="col-sm-4 col-md-4" style="display: none>' +
				'<div class="thumbnail">' +
				'<img src="http://localhost:3000/' + item.ID + '/image1.png" alt="' + item.Ten + '" title="' + item.Ten + '" class="img-responsive" alt="Cinque Terre">' +
				'<div class="caption">' +
				'<h4>' + item.Ten + '</h4>' +
				'<p>' +
				'<a href="ChiTietSanPham.html?id='+item.ID+'" class="btn btn-primary" class="btn btn-primary">' +
				'<span class="glyphicon glyphicon-eye-open"></span>' +
				'Details' +
				'</a>' +
				' <a href="javascript:;" data-id="'+item.ID+'" class="btn btn-warning btn-like-list">' +
				'<span class="glyphicon glyphicon-heart"></span>' +
				' Yêu thích' +
				'</a>' +
				'</p>' +
				'</div>' +
				'</div>' +
				'</div>';
			console.log(html);
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

$("#content").on('click', '.btn-like-list', function() {
	var dataPost = {
		NguoiDung: localStorage.id_token,
		SanPham: $(this).data("id")
	}, 
	jsonPost = JSON.stringify(dataPost);

	console.log(jsonPost);
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
	.done(function() {
		console.log("success");
	})
	.fail(function(err) {
		console.log(err);
		if(err.status == 403){
			window.location.href = 'login.html';
		} else if(err.status == 500) {
			swal("Lỗi", "Thêm vào danh sách không thành công", "error");
		}
	});
});

