var getFullDate = function(data) {
	if(data == null) {
		return "----";
	} else {
		var date = new Date(data);
		return (
			date.getDate() + "-" + (date.getMonth()+1) + "-" + date.getFullYear() + " "
			+ (date.getHours()) + ":" + (date.getMinutes()) + ":" + (date.getSeconds())
			);
	}
};

$(document).ready(function() {
	if(sessionStorage.user != undefined) {
		$("#show-admin-login").append(sessionStorage.user);
		$("div").remove(".admin-log-out");
	} else {
		$("div").remove(".admin-log-in");
	}

	$.ajax({
		url: 'http://localhost:3000/admin',
		type: 'GET',
		dataType: 'json',
		headers: {
			'x-access-token': sessionStorage.access_token
		}
	})
	.done(function(data) {
		//console.log(data);
	})
	.fail(function(xhr, status, err) {
		//$("#show-admin-login").append("(Đăng nhập lại)");
		//swal('Hết hạn', 'Đăng nhập hết hạn, hãy đăng nhập lại', 'error');
		alert('Hãy đăng nhập để truy cập trang này');
		window.location.href = 'login.html';
	});	

	$('#btn-log-out').on('click', function() {
		sessionStorage.removeItem('user');
		sessionStorage.removeItem('access_token');
		//sessionStorage.user = sessionStorage.access_token = undefined;
		window.location.href = "login.html";
	});
});