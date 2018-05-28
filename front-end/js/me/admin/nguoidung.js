var loadData = function (data, data1) {
	var xhtml = '',
		xhtml1 = '';

	//list người dùng
	$(data).each(function(index, value) {
		xhtml += '<tr>';
		xhtml += '<td>' + value.ID + '</td>';
		xhtml += '<td>' + value.NAME + '</td>';
		xhtml += '<td>' + value.username + '</td>';
		xhtml += '<td>' + value.STATUS + '</td>';
		xhtml += '<td>' + value.ADDRESS + '</td>';
		xhtml += '<td>' + value.PHONE + '</td>';
		xhtml += '<td>' + value.EMAIL + '</td>';
		xhtml += '<td>' + value.DiemDanhGia + '</td>';
		xhtml += '<td><button type="button" class="btn btn-danger btn-delete-user" data-id="'+ value.ID +'">Xóa</button></td>';

		xhtml += '</tr>';
	});

	$('#tb-nguoidung').html(xhtml);

	//list reset pass

	$(data1).each(function(index, value) {
		xhtml1 += '<li class="list-group-item">';
		xhtml1 += '<strong>'+ value.NAME +'</strong> ';
		xhtml1 += getFullDate(value.ThoiGian) + ' ';
		xhtml1 += ' <button type="button" class="btn btn-accept btn-sm btn-success" data-id="'+ value.ID +'">Chấp nhận</button>';
		xhtml1 += ' <button type="button" class="btn btn-decline btn-sm btn-danger" data-id="'+ value.ID +'">Từ chối</button>';
		xhtml1 += '</li>';
	});
	$('#list-reset-pass').html(xhtml1);

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
		loadData(data.data, data.data1);
		//console.log(data);
	})
	.fail(function(xhr, status, err) {
		console.log(xhr);
		swal(status, xhr.responseJSON.mess);
	});

	// btn xóa người dùng
	$('#tb-nguoidung').on('click', '.btn-delete-user', function() {
		//alert($(this).data("id"));
		var dataPost = {id: $(this).data('id')},
			jsonPost = JSON.stringify(dataPost);
		$.ajax({
			url: 'http://localhost:3000/admin/nguoidung',
			type: 'DELETE',
			dataType: 'json',
			headers: {
				'x-access-token': sessionStorage.access_token
			},
			data: jsonPost,
			contentType: 'application/json'
		})
		.done(function(data) {
			swal("Xóa người dùng thành công")
			loadData(data.data, data.data1);
			//console.log(data);
		})
		.fail(function(xhr, status, err) {
			swal(status, xhr.responseJSON.mess);
		});
	});

	$('#list-reset-pass').on('click', '.btn-accept', function() {
		var dataPost = {id: $(this).data('id')},
			jsonPost = JSON.stringify(dataPost);
		$.ajax({
			url: 'http://localhost:3000/admin/resetpass',
			type: 'post',
			dataType: 'json',
			headers: {
				'x-access-token': sessionStorage.access_token
			},
			data: jsonPost,
			contentType: 'application/json'
		})
		.done(function(data) {
			swal("Cấp lại mật khẩu người dùng thành công")
			loadData(data.data, data.data1);
			//console.log(data);
		})
		.fail(function(xhr, status, err) {
			swal(status, xhr.responseJSON.mess);
		});
	});

	$('#list-reset-pass').on('click', '.btn-decline', function() {
		var dataPost = {id: $(this).data('id')},
			jsonPost = JSON.stringify(dataPost);
		$.ajax({
			url: 'http://localhost:3000/admin/resetpass',
			type: 'delete',
			dataType: 'json',
			headers: {
				'x-access-token': sessionStorage.access_token
			},
			data: jsonPost,
			contentType: 'application/json'
		})
		.done(function(data) {
			swal("Hủy yêu cầu thành công")
			loadData(data.data, data.data1);
			//console.log(data);
		})
		.fail(function(xhr, status, err) {;
			swal(status, xhr.responseJSON.mess);
		});
	});

});