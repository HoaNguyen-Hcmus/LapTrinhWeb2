$(document).ready(function() {
	$('#btn-login').on('click', function(event) {

		var dataPost = {
			user: $("#user-login").val(),
			pass: $("#pass-login").val()
		};

		var jsontopost = JSON.stringify(dataPost);

		$.ajax({
			url: 'http://localhost:3000/admin/login',
			type: 'POST',
			dataType: 'json',
			data: jsontopost,
			contentType: 'application/json',

		})
		.done(function(data) {
			sessionStorage.access_token = data.access_token;
			//console.log(localStorage.access_token);
			sessionStorage.user = data.user;
			//console.log(data);
			window.location.href = "index.html";
		})
		.fail(function(xhr, status, err) {
			//console.log(xhr);
			//console.log(status);
			//console.log(err);
			swal("Đăng nhập không thành công", "Tên đăng nhập hoặc mật khẩu không chính xác!", "error");

		});
	});
});