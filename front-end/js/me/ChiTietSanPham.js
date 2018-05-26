$(document).ready(function () {
	//HandlebarsIntl.registerWith(Handlebars);
	loadSanPham();
});

var loadSanPham = function () {
	$('.loader').show();

	$.ajax({
		url: 'http://localhost:3000/sanPham/2',
		dataType: 'json',
		timeout: 10000
	}).done(function (data) {
		/*var source = $('#sanpham-template').html();
		var template = Handlebars.compile(source);
		var html = template(data);
		console.log(html);
		$('#body-sp').append(html);*/
		var thumb = '<img src="imgs/sp/' + data.ID + '/main_thumbs.jpg" alt="asd" title="ads">' +
			'<img src="imgs/sp/' + data.ID + '/main.jpg" alt="asd" title="ads">' +
			'<img src="imgs/sp/' + data.ID + '/1.jpg" alt="asd" title="ads">' +
			'<div class="caption" id ="mt">' +
			'<h4> mô tả: </h4>' +
			data.MoTa +
			'<p>' +
			'<a href="javascript:;" class="btn btn-danger">' +
			'<span class="glyphicon glyphicon-eye-open"></span>' +
			'Add' +
			'</a>' +
			'</p>' +
			'</div>'
		$('#TenSanPham').append('<h3 class="panel-title">' + data.Ten + '</h3>');
		$('#thumbnail').append(thumb);
		$('#btn-NguoiBan').append('<h3 class="panel-title">' + data.NguoiBan + '</h3>');
		$('#GiaHienTai').append(data.GiaDuaRa + ' ' +
			'<buttons class="btn btn-small btn-success" >' + data.NguoiRaGia + '</button>');
		$('#GiaMuaNgay').append(data.GiaMuaNgay);
		$('#GioDang').append(data.GioDang);
		$('#ThoiHanBan').append(data.ThoiHanBan);

		$('#body-sp div[style]').fadeIn(1000, function () {
			$(this).removeAttr('style');
		});

		//CUR_PAGE++;
        /*if (data.hasMore === false) {
            $('#btnMore').hide();
        }*/

		$('.loader').hide();
	});
};