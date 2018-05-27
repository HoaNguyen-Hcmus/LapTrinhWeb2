var loadData = function (data) {
	var xhtml = '';

	$(data).each(function(index, value) {
		xhtml += '<tr>';
		xhtml += '<td>' + value.ID + '</td>';
		xhtml += '<td>' + value.NAME + '</td>';
		xhtml += '<td>' + value.USERNAME + '</td>';
		xhtml += '<td>' + value.STATUS + '</td>';
		xhtml += '<td>' + value.ADDRESS + '</td>';
		xhtml += '<td>' + value.PHONE + '</td>';
		xhtml += '<td>' + value.EMAIL + '</td>';
		xhtml += '<td>' + value.DiemDanhGia + '</td>';
		xhtml += '<td><button type="button" class="btn btn-danger btn-delete-user" data-id="'+ value.ID +'">Xóa</button></td>';

		xhtml += '</tr>';
	});

	$('#tb-nguoidung').html(xhtml);
};

$(document).ready(function() {
	$.ajax({
		url: 'http://localhost:3000/admin/nguoidung',
		type: 'GET',
		dataType: 'json',
		headers: {
			'x-access-token': sessionStorage.access_token
		}
	})
	.done(function(data) {
		loadData(data.data);
		//console.log(data);
	})
	.fail(function(xhr, status, err) {;
		swal(status, xhr.responseJSON.mess);
	});

	$('#tb-nguoidung').on('click', '.btn-delete-user', function() {
		//alert($(this).data("id"));
		var dataPost = {id: $(this).data("id")},
			jsonPost = JSON.stringify(dataPost);
		$.ajax({
			url: 'http://localhost:3000/admin/nguoidung',
			type: 'DELETE',
			dataType: 'json',
			headers: {
				'x-access-token': sessionStorage.access_token
			},
			data: jsonPost
		})
		.done(function(data) {
			loadData(data.data);
			//console.log(data);
		})
		.fail(function(xhr, status, err) {;
			swal(status, xhr.responseJSON.mess);
		});
		
	});
});