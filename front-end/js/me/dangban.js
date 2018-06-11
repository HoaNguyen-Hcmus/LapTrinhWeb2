$(document).ready(function() {
	var date = new Date();

	$("#btn-submit").on('click', function() {
		var thoihanban = $("#ngaydaugia").val() + " " + $("#giodaugia").val(),
			date = new Date(),
			date1 = new Date(thoihanban);

		if(date1 < date || thoihanban == " ") {
			swal("Lỗi", "Thời hạn bán phải lớn hơn thời gian hiện tại", "error");
			return false;
		}
	});
	if(localStorage.banhang_token != 1) {
		window.location = "index.html";
	}

	//show danhmuc
	$.ajax({
		url: 'http://localhost:3000/nguoiban/danhmuc',
		type: 'GET',
		dataType: 'json',
		headers: {
			// check token
			"x-access-token": localStorage.access_token
		}
	})
	.done(function(data) {
		//console.log(data.danhmuc);
		var xhtml = "";
		$(data.danhmuc).each(function(index, val) {
			xhtml += '<option value="'+val.ID+'">'+ val.Ten +'</option>';
		});
		$("#danhmuc").html(xhtml);
	})
	.fail(function() {
		console.log("error");
	});
	

	ClassicEditor
	.create( document.querySelector( '#mota' ) )
	.then( editor => {

	})
	.catch( error => {
		console.error( error );
	});


	$('#frm').submit(function() {
		$(this).ajaxSubmit({
			beforeSubmit: function(formData, jqForm, options) {
				
			},
			success: function showResponse(responseText, statusText, xhr, $form) {
				//alert(responseText);
				var dataPost = {
					ten: $("#tensanpham").val(),
					mota: $("#mota").val(),
					giakhoidiem: $("#giakhoidiem").val(),
					buocgia: $("#buocgia").val(),
					giamuangay: $("#giamuangay").val(),
					tudonggiahan: $("#tugiahan").val(),
					thoihanban: $("#ngaydaugia").val() + " " + $("#giodaugia").val(),
					nguoiban: localStorage.id_token,
					danhmuc: $("#danhmuc").val()
				},
				date = new Date(),
				date1 = new Date(dataPost.thoihanban),
				jsonPost = JSON.stringify(dataPost);

				if(date1 < date || dataPost.thoihanban == " ") {
					swal("Lỗi", "Thời hạn bán phải lớn hơn thời gian hiện tại", "error");
				} else {
					$.ajax({
						url: 'http://localhost:3000/nguoiban/dangban',
						type: 'POST',
						dataType: 'json',
						data: jsonPost,
						headers: {
							// check token
							"x-access-token": localStorage.access_token
						},
						contentType: 'application/json'
					})
					.done(function(data) {
						//console.log(data);
						swal("Thành công", data.mess, "success");
					})
					.fail(function(err) {
						swal("Lỗi", err.responseJSON.err, "error");
					})	
				}
			}
		});
		return false;
	});
});