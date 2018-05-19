$(document).ready(function() {
	$("#btn-sign-up").on('click', function() {
		swal('Người dùng đăng kí');
		var data = {
			name: $("#name-sign-up").val(),
			birth: $("#birth-sign-up").val(),
			address: $("#address-sign-up").val(),
			phone: $("#phone-sign-up").val(),
			mail: $("#mail-sign-up").val(),
			type: $("#type-sign-up").val(),
			user: $("#user-sign-up").val(),
			pass: $("#pass-sign-up").val()
		}
		console.log(data);
		//ajax event
	});

	$("#btn-log-in").on('click', function() {
		//swal('Người dùng đăng nhập');
		//ajax event
		var dataToPost = {
			user: $("#user-login").val(),
			pass: $("#pass-login").val()
		};
		var jsonToPost = JSON.stringify(dataToPost);
		$.ajax({
			url: 'http://localhost:3000/login',
			type: 'POST',
			dataType: 'json',
			timeout: 10000,
			contentType: 'application/json',
			data: jsonToPost
		}).done(function(data) {
			localStorage.access_token = data.access_token;
			window.location.href= 'index.html';
		}).fail(function(xhr, status, err) {
			console.log(err);
			swal('đăng nhập thất bại')
		});
	});
});