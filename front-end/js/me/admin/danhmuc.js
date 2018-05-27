var loadData = function (data) {
	var xhtml = "",
		i = 0;

	$(data).each(function(index, value) {
		i++;
		xhtml += '<tr>';
		xhtml += '<td>'+ value.ID +'</td>';
		xhtml += '<td>'+ value.Ten +' - <span class="badge row-danhmuc" data-toggle="modal" href="#modal-edit" data-id="'+ i +'">Chỉnh sửa</span></td>';
		xhtml += '<td><button type="button" class="btn btn-sm btn-delete-dm btn-danger" data-id = "'+ value.ID +'">Xóa</button></td>';
		xhtml += '</tr>';
	});

	$('#tb-danhmuc').hide(1);
	$('#tb-danhmuc').show(1000);
	$("#tb-danhmuc").html(xhtml);
}

$(document).ready(function() {
	$.ajax({
		url: 'http://localhost:3000/admin/danhmuc',
		type: 'GET',
		dataType: 'json',
		headers: {
			'x-access-token': sessionStorage.access_token
		}
	})
	.done(function(data) {
		//console.log(data);
		loadData(data.data);
	})
	.fail(function(xhr, textStatus) {
			swal(textStatus, xhr.responseJSON.mess, "error");
		});

	$("#tb-danhmuc").on('click', '.row-danhmuc', function(event) {
		$.ajax({
			url: 'http://localhost:3000/admin/danhmuc/' + $(this).data("id"),
			type: 'GET',
			dataType: 'json',
			headers: {
				"x-access-token": sessionStorage.access_token
			}
		})
		.done(function(data) {
			var date_add = getFullDate(data.data[0].NgayThem);
			var date_edit = getFullDate(data.data[0].NgaySuaDoi);
			$("#danhmuc-id").val(data.data[0].ID);
			$("#danhmuc-edit").val(data.data[0].Ten);
			$("#danhmuc-date-add").val(date_add);
			$("#danhmuc-date-edit").val(date_edit);
		})
		.fail(function(xhr, textStatus) {
			swal(textStatus, xhr.responseJSON.mess, "error");
		});
	});

	$("#btn-add-danhmuc").on('click', function() {
		var dataPost = {
			name: $("#danhmuc-add").val()
		}

		var jsonPost = JSON.stringify(dataPost);

		$.ajax({
			url: 'http://localhost:3000/admin/danhmuc',
			type: 'POST',
			dataType: 'json',
			data: jsonPost,
			contentType: 'application/json',
			headers: {
				'x-access-token': sessionStorage.access_token
			}
		})
		.done(function(data) {
			loadData(data.data);
		})
		.fail(function(xhr,textStatus,error) {
			swal(textStatus, xhr.responseJSON.mess, "error");
		});
		
	});

	$("#btn-edit-danhmuc").click(function() {
		var dataPost = {
			id: $("#danhmuc-id").val(),
			name: $("#danhmuc-edit").val()
		}

		var jsonPost = JSON.stringify(dataPost);
		$.ajax({
			url: 'http://localhost:3000/admin/danhmuc',
			type: 'PUT',
			dataType: 'json',
			data: jsonPost,
			contentType: 'application/json',
			headers: {
				'x-access-token': sessionStorage.access_token
			}
		})
		.done(function(data) {
			//alert('Chỉnh sửa danh mục thành công');
			loadData(data.data);
		})
		.fail(function(xhr,textStatus,error) {
			swal(textStatus, xhr.responseJSON.mess, "error");
		});
	});

	$("#tb-danhmuc").on('click', '.btn-delete-dm', function() {
		var dataPost = {
			id: $(this).data("id")
		}

		var jsonPost = JSON.stringify(dataPost);
		$.ajax({
			url: 'http://localhost:3000/admin/danhmuc',
			type: 'DELETE',
			dataType: 'json',
			data: jsonPost,
			contentType: 'application/json',
			headers: {
				'x-access-token': sessionStorage.access_token
			}
		})
		.done(function(data) {
			//alert('Xóa danh mục thành công');
			loadData(data.data);
		})
		.fail(function(xhr,textStatus,error) {
			swal(textStatus, xhr.responseJSON.mess, "error");
		});
	});
});