$.ajax({
	url: 'http://localhost:3000',
	type: 'GET',
	dataType: 'json',
	data: {},
})
.done(function(data) {
	$("#test").html(data.mess);
	swal('Đã load trang test');
})
.fail(function(error) {
	console.log(error);
});

$("#btn-loguot").on('click', function() {
	sessionStorage.removeItem('access_token');
});
