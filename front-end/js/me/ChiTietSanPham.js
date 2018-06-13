$(document).ready(function () {
	//show ckeditor
	ClassicEditor
	.create( document.querySelector('#mota-add'))
	.then(editor => {})
	.catch(error => {console.error( error );});

	//check login ?show btn login/logout
	if(localStorage.user_token != undefined) {
		$("#user").html(localStorage.user_token);
		$("#logouted").remove();
	} else {
		$("#logined").remove();
	}

	//get query string parameters
	var url = new URLSearchParams(window.location.search);
	var id = url.get("id");

	//check null id
	if(id == null)
		window.location.href = "index.html";

	//get image from server
	var image_html = '<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">';
    
    image_html += '<img src="http://localhost:3000/'+id+'/image1.png" class="img-responsive" alt="Image">';
	image_html += '</div>';
	image_html += '<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">';
	image_html += '<img src="http://localhost:3000/'+id+'/image2.png" class="img-responsive" alt="Image">';
	image_html += '</div>';
	image_html += '<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">';
	image_html += '<img src="http://localhost:3000/'+id+'/image3.png" class="img-responsive" alt="Image">';
	image_html += '</div>';

	$("#image-content").html(image_html);


	//ajax get data (deatail product, descript, ...)
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
		if(row == undefined) 
			window.location.href = "index.html";

		//check user is VIP?
		if(localStorage.id_token != row.ID) {
			$("#nguoiban").remove();
		}
		
		xhtml += '<li class="list-group-item">Người bán: <a href="profile.html?id='+ row.ID +'">'+ row.Name +'</a><span class="badge">'+ row.DiemDanhGia +' điểm</span></li>';
        xhtml += '<li class="list-group-item">Giá hiện tại: '+ formatCurrent(nguoigiugia.GiaDuaRa) +'</li>';
        xhtml += '<li class="list-group-item">Người đang giữ giá cao nhất: <a href="'+ nguoigiugia.ID +'">'+ encodeUser(nguoigiugia.NAME) +'</a><span class="badge">'+ nguoigiugia.DiemDanhGia +' điểm</span></li>';
        xhtml += '<li class="list-group-item">Giá mua ngay: '+ formatCurrent(row.GiaMuaNgay) +'</li>';
        xhtml += '<li class="list-group-item">Thời điểm đăng: '+ getFullDate(row.GioDang) +'</li>';
        xhtml += '<li class="list-group-item">Thời điểm kết thúc: '+ getFullDate(row.ThoiHanBan) +'</li>';
        xhtml += '<li class="list-group-item">';
        xhtml += '<a class="btn btn-success btn-block btn-ragia" data-toggle="modal" href="#modal-ragia" role="button">Ra giá sản phẩm  <span class="glyphicon glyphicon-shopping-cart"></span></a>';
        xhtml += '</li>';
        xhtml += '<li class="list-group-item"><button type="button" class="btn btn-warning btn-block btn-like-list">Thêm vào danh sách yêu thích <span class="glyphicon glyphicon-heart"></span></button></li>';


        $(mota).each(function(index, value) {
        	xhtml_mota += '<h4><u><strong>Mô tả 1:</strong> Update: <i>'+ getFullDate(value.ThoiGian) +'</i></u></h4>';
        	xhtml_mota += value.MoTa;
        });

        $("#list-group").html(xhtml);
        $("#mota").html(xhtml_mota);
        $('#title-product').html(row.Ten);
	})
	.fail(function(err) {
		console.log(err);
	});

	//Add product to like list
	$("#list-group").on('click', '.btn-like-list', function() {
		var dataPost = {
			NguoiDung: localStorage.id_token,
			SanPham: id
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

	//add new descript

	//kick user from list
});