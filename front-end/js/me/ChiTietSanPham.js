var loadDauGia = function(data) {
	var xhtml = "";
	$(data).each(function(index, vl) {
		var t = "";
		if(index == 0 && localStorage.id_token == vl.NguoiBan) {
			t += '<button type="button" id="kick-user" data-dismiss="modal" data-user="'+ vl.id +'" class="btn btn-danger">Kick khỏi cuộc đấu giá</button>';
		}
		if(localStorage.id_token == vl.NguoiBan) {
			xhtml += '<li class="list-group-item">' + getFullDate(vl.ThoiGianDuaRa) + ' - <a class="profile-user" data-toggle="modal" href="#modal-profile" data-id="'+ vl.id +'">' + encodeUser(vl.NAME) + '</a> => ' + vl.GiaDuaRa + ' ' + t +'</li>';
		} else {
			xhtml += '<li class="list-group-item">' + getFullDate(vl.ThoiGianDuaRa) + ' - ' + encodeUser(vl.NAME) + ' => ' + vl.GiaDuaRa + ' ' + t +'</li>';
		}
	});
	$("#load-daugia").html(xhtml);
};

var loadMoTa = function(data) {
	var xhtml = "";
	$(data).each(function(index, value) {
		xhtml += '<h4><u><strong>Mô tả '+(index+1)+':</strong> Update: <i>'+ getFullDate(value.ThoiGian) +'</i></u></h4>';
		xhtml += value.MoTa;
	});

	$("#mota").html(xhtml);
};

var loadData = function(data, nguoigiugia) {
	id_nguoiban = data.NguoiBan;
	//console.log(data);
	var xhtml = "";
	//check user is VIP?
	if(localStorage.id_token == undefined || localStorage.id_token != data.ID) {
		$("#nguoiban").remove();
	}

	if(nguoigiugia == undefined) {
		nguoigiugia = {
			GiaDuaRa: data.GiaDauGia,
			id: "",
			NAME: ""
		};
	}

	//set giá sàn
	giasan = nguoigiugia.GiaDuaRa + data.BuocGia;

	$("#price").val(giasan);
	
	$("#price").attr({
		"min": giasan
	});
	//console.log(data);

	if(data.ID == localStorage.id_token || localStorage.id_token == undefined || data.ConLai < 0) {
		$("#ragia").attr({
			disabled: ''
		});
	}

	xhtml += '<li class="list-group-item">Người bán: <a class="profile-user" data-toggle="modal" href="#modal-profile" data-id="'+ data.ID +'">'+ data.Name +'</a><span class="badge">'+ data.DiemDanhGia +' điểm</span></li>';
    xhtml += '<li class="list-group-item">Giá hiện tại: '+ formatCurrent(nguoigiugia.GiaDuaRa) +'</li>';
    xhtml += '<li class="list-group-item">Người đang giữ giá cao nhất: <a class="profile-user" data-toggle="modal" href="#modal-profile" data-id="'+ nguoigiugia.ID +'">'+ encodeUser(nguoigiugia.NAME) +'</a><span class="badge">'+ nguoigiugia.DiemDanhGia +' điểm</span></li>';
    xhtml += '<li class="list-group-item">Giá mua ngay: '+ formatCurrent(data.GiaMuaNgay) +'</li>';
    xhtml += '<li class="list-group-item">Thời điểm đăng: '+ getFullDate(data.GioDang) +'</li>';
    xhtml += '<li class="list-group-item">Thời điểm kết thúc: '+ getFullDate(data.ThoiHanBan) +'</li>';
    xhtml += '<li class="list-group-item">';
    xhtml += '<a class="btn btn-success btn-block btn-ragia" data-toggle="modal" href="#modal-ragia" role="button">Ra giá sản phẩm  <span class="glyphicon glyphicon-shopping-cart"></span></a>';
    xhtml += '</li>';
    xhtml += '<li class="list-group-item"><button type="button" class="btn btn-warning btn-block btn-like-list">Thêm vào danh sách yêu thích <span class="glyphicon glyphicon-heart"></span></button></li>';
    xhtml += '<li class="btn list-group-item" data-toggle="modal" href="#modal-show-history" id="btn-show-history">Lịch sử ra giá</li>';

    $("#list-group").html(xhtml);
    $('#title-product').html(data.Ten);
};

var loadProfile = function(data) {
	console.log(data);
	$("#nhanxet-name").html("<strong>Họ tên: </strong>" + data.data[0].NAME);
	$("#nhanxet-score").html("<strong>Điểm đánh giá: </strong>" + data.data[0].DiemDanhGia);

	var xhtml = "";

	$(data.nhanxet).each(function(index, value) {
		xhtml += "<tr>"	;
		xhtml += "<td>"+(index+1)+"</td>";
		xhtml += "<td>"+value.NAME+"</td>";
		xhtml += "<td>"+value.LoiNhanXet+"</td>";
		xhtml += "<td>"+getFullDate(value.ThoiGian)+"</td>";
		xhtml += "</tr>";
	});

	$("#table-nhanxet").html(xhtml);
}

$(document).ready(function () {
	var id_nguoiban = 0;
	//show ckeditor
	ClassicEditor
	.create( document.querySelector( '#add-mota' ) )
	.then( editor => {

	})
	.catch( error => {
		console.error( error );
	});

	//check login ?show btn login/logout
	if(localStorage.user_token != undefined) {
		$("#user").html(localStorage.user_token);
		$("#logouted").remove();
	} else {
		$("#logined").remove();
	}

	//get query string parameters
	var url = new URLSearchParams(window.location.search);
	var id = url.get("id"),
		nguoiban = "",
		giasan = 0;

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
		var xhtml_mota = "";

		//check product is not null
		if(data.data == undefined) 
			window.location.href = "index.html";
		
		loadData(data.data[0], data.nguoigiugia[0]); //load data dữ liệu sản phẩm
		loadMoTa(data.mota);
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
			swal("Thông báo", "Thêm vào danh sách yêu thích thành công", "success");
		})
		.fail(function(err) {
			if(err.status == 403){
				window.location.href = 'login.html';
			} else if(err.status == 500) {
				swal("Lỗi", "Thêm vào danh sách không thành công", "error");
			}
		});
	});

	//add new descript

	$('#frm').submit(function() {
		$(this).ajaxSubmit({
			beforeSubmit: function(formData, jqForm, options) {
				
			},
			success: function showResponse(responseText, statusText, xhr, $form) {
				var dataPost = {
					id: id,
					mota: $("#add-mota").val()
				}, jsonPost = JSON.stringify(dataPost);

				$.ajax({
					url: 'http://localhost:3000/nguoiban/dangmota',
					type: 'POST',
					dataType: 'json',
					contentType: 'application/json',
					data: jsonPost,
				})
				.done(function(data) {
					loadMoTa(data.data);
			        swal('Thêm mô tả thành công');
				})
				.fail(function(err) {
					//console.log(err);
				});	
			}
		});
		return false;
	});

	//kick user from list

	//load đáu giá
	$("#list-group").on('click', '#btn-show-history',function() {
		$.ajax({
			url: 'http://localhost:3000/sanpham/loaddaugia/'+id,
			type: 'GET',
			dataType: 'json',
		})
		.done(function(data) {
			loadDauGia(data.data);
		})
		.fail(function(err) {
			console.log(err);
		});
	});


	$("#load-daugia").on('click', '#kick-user', function(event) {
		var dataPost = {
			user: $(this).data("user"),
			sanpham: id
		}, jsonPost = JSON.stringify(dataPost);

		$.ajax({
			url: 'http://localhost:3000/nguoiban/kickuser',
			type: 'POST',
			dataType: 'json',
			headers: {
				"x-access-token": localStorage.access_token
			},
			data: jsonPost,
			contentType: 'application/json'
		})
		.done(function(data) {
			swal('Thông báo', 'Kick người mua thành công!', "success");
			loadDauGia(data.data);
		})
		.fail(function(err) {
			console.log(err);
		});
		
	});
	

	//đáu giá
	$("#ragia").on('click', function() {
		swal({
			title: "Bạn có chắc?",
			text: "Bạn có muốn đấu giá sản phẩm với giá " + $("#price").val() + " không?",
			icon: "warning",
			buttons: true,
			dangerMode: true,
		})
		.then((willDelete) => {
			if (willDelete) {
				var dataPost = {
					sanpham: id,
					nguoiragia: localStorage.id_token,
					giaduara: $("#price").val()
				}, jsonPost = JSON.stringify(dataPost);
				console.log(dataPost);
				$.ajax({
					url: 'http://localhost:3000/sanpham/daugia',
					type: 'POST',
					dataType: 'json',
					headers: {
						"x-access-token": localStorage.access_token
					},
					data: jsonPost,
					contentType: "application/json"
				})
				.done(function(data) {
					console.log(data);
					loadDauGia(data.daugia);
					loadData(data.data[0], data.nguoigiugia[0])
					swal("Bạn đã ra giá thành công!", {
						icon: "success",
					});
					console.log("success");
				})
				.fail(function(err) {
					swal("Bạn đã ra giá thất bại!", {
						icon: "error",
					});
					console.log(err);
				})
				.always(function() {
					console.log("complete");
				});
			} else {
				swal("Bạn đã hủy cuộc ra giá này!");
			}
		});
	});

	$("#list-group").on('click', '.profile-user', function() {
		$.ajax({
			url: 'http://localhost:3000/sanpham/getProfile/' + $(this).data("id"),
			type: 'GET',
			dataType: 'json',
		})
		.done(function(data) {
			loadProfile(data);
		})
		.fail(function() {
			console.log("error");
		});
	});

	$("#load-daugia").on('click', '.profile-user', function() {
		$.ajax({
			url: 'http://localhost:3000/sanpham/getProfile/' + $(this).data("id"),
			type: 'GET',
			dataType: 'json',
		})
		.done(function(data) {
			loadProfile(data);
		})
		.fail(function(err) {
			console.log(err);
		});
	});
});