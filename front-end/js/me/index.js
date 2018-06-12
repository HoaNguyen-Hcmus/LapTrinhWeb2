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
				'<img src="imgs/sp/' + item.ID + '/main_thumbs.jpg" alt="' + item.Ten + '" title="' + item.Ten + '">' +
				'<div class="caption">' +
				'<h4>' + item.Ten + '</h4>' +
				'<p>' +
				'<a href="javascript:;" class="btn btn-primary">' +
				'<span class="glyphicon glyphicon-eye-open"></span>' +
				'Details' +
				'</a>' +
				'<a href="javascript:;" class="btn btn-danger">' +
				'<span class="glyphicon glyphicon-shopping-cart"></span>' +
				'Add' +
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
				'<img src="imgs/sp/' + item.ID + '/main_thumbs.jpg" alt="' + item.Ten + '" title="' + item.Ten + '">' +
				'<div class="caption">' +
				'<h4>' + item.Ten + '</h4>' +
				'<p>' +
				'<a href="javascript:;" class="btn btn-primary">' +
				'<span class="glyphicon glyphicon-eye-open"></span>' +
				'Details' +
				'</a>' +
				'<a href="javascript:;" class="btn btn-danger">' +
				'<span class="glyphicon glyphicon-shopping-cart"></span>' +
				'Add' +
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
				'<img src="imgs/sp/' + item.ID + '/main_thumbs.jpg" alt="' + item.Ten + '" title="' + item.Ten + '">' +
				'<div class="caption">' +
				'<h4>' + item.Ten + '</h4>' +
				'<p>' +
				'<a href="javascript:;" class="btn btn-primary">' +
				'<span class="glyphicon glyphicon-eye-open"></span>' +
				'Details' +
				'</a>' +
				'<a href="javascript:;" class="btn btn-danger">' +
				'<span class="glyphicon glyphicon-shopping-cart"></span>' +
				'Add' +
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

