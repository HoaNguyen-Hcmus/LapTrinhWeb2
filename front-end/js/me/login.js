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
		swal('Người dùng đăng nhập');
		//ajax event
	});
});