$(document).ready(function () {
	if(localStorage.user_token != undefined) {
		$("#user").html(localStorage.user_token);
		$("#logouted").remove();
	} else {
		$("#logined").remove();
	}

	var url = new URLSearchParams(window.location.search);
	var id = url.get("id");

	if(id == null)
		window.location.href = "index.html";

	var image_html = '<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">';
    
    image_html += '<img src="http://localhost:3000/1/image1.png" class="img-responsive" alt="Image">';
	image_html += '</div>';
	image_html += '<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">';
	image_html += '<img src="http://localhost:3000/1/image2.png" class="img-responsive" alt="Image">';
	image_html += '</div>';
	image_html += '<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">';
	image_html += '<img src="http://localhost:3000/1/image3.png" class="img-responsive" alt="Image">';
	image_html += '</div>';

	$("#image-content").html(image_html);

	$.ajax({
		url: 'http://localhost:3000/sanpham/' + id,
		type: 'GET',
		dataType: 'json'
	})
	.done(function(data) {
		//console.log(data.nguoigiugia);
		var row = data.data[0],
			mota = data.mota,
			nguoigiugia = data.nguoigiugia[0];
		var xhtml = "",
			xhtml_mota = "";
		xhtml += '<li class="list-group-item">Người bán: <a href="profile.html?id='+ row.ID +'">'+ row.Name +'</a><span class="badge">'+ row.DiemDanhGia +' điểm</span></li>';
        xhtml += '<li class="list-group-item">Giá hiện tại: '+ formatCurrent(nguoigiugia.GiaDuaRa) +'</li>';
        xhtml += '<li class="list-group-item">Người đang giữ giá cao nhất: <a href="'+ nguoigiugia.ID +'">'+ nguoigiugia.NAME +'</a><span class="badge">'+ nguoigiugia.DiemDanhGia +' điểm</span></li>';
        xhtml += '<li class="list-group-item">Giá mua ngay: '+ formatCurrent(row.GiaMuaNgay) +'</li>';
        xhtml += '<li class="list-group-item">Thời điểm đăng: '+ getFullDate(row.GioDang) +'</li>';
        xhtml += '<li class="list-group-item">Thời điểm kết thúc: '+ getFullDate(row.ThoiHanBan) +'</li>';
        xhtml += '<li class="list-group-item">';
        xhtml += '<a class="btn btn-success" data-toggle="modal" href="#modal-ragia" role="button">Ra giá sản phẩm  <span class="glyphicon glyphicon-shopping-cart"></span></a>';
        xhtml += '</li>';
        xhtml += '<li class="list-group-item"><button type="button" class="btn btn-warning">Thêm vào danh sách yêu thích <span class="glyphicon glyphicon-heart"></span></button></li>';


        $(mota).each(function(index, value) {
        	xhtml_mota += '<h4><u><strong>Mô tả 1:</strong> Update: <i>'+ getFullDate(value.ThoiGian) +'</i></u></h4>';
        	xhtml_mota += value.MoTa;
        });

        $("#list-group").html(xhtml);
        $("#mota").html(xhtml_mota);
	})
	.fail(function(err) {
		console.log(err);
	});
	
});