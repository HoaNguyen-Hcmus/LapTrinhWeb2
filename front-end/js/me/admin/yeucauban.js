var loadData = function(data) {
	var d = new Date();
	var xhtml = "";
	var i = 0;

	$(data.data).each(function(idx, val) {
		i++;
		var addclass = "",
			status = "",
			btn = "",
			d_xinphep = getFullDate(val.ThoiGianXin);

		if(val.ThoiGianChapNhan != null) {
			var d_chapnhan = getFullDate(val.ThoiGianChapNhan),
			
			d2 = new Date(val.ThoiGianChapNhan),
			d_hethan = d2; 

			d_hethan.setDate(d2.getDate()+7);
		} else {
			d_hethan = new Date(),
			d_chapnhan = '------';
		}

		if(val.TrangThai == 1) {
			addclass = "success";
			status = "Đã cấp phép";
		} else if(val.TrangThai == 0) {
			btn += "<button type='button' data-id='"+ val.ID +"' class='btn btn-sm btn-accept btn-success'><i class='glyphicon glyphicon-ok'></i></button>";
			btn += " - <button type='button' data-id='"+ val.ID +"' class='btn btn-sm btn-decline btn-danger'><i class='glyphicon glyphicon-remove'></i></button>";
			addclass = "warning";
			status = "Chưa cấp phép";
		} else {
			btn += "<button type='button' data-id='"+ val.ID +"' class='btn btn-sm btn-accept btn-success'><i class='glyphicon glyphicon-ok'></i></button>";
			btn += " - <button type='button' data-id='"+ val.ID +"' class='btn btn-sm btn-decline btn-danger'><i class='glyphicon glyphicon-remove'></i></button>";
			addclass = "danger";
			status = "Giấy phép hết hạn";
		}
		xhtml += "<tr class='"+ addclass +"'>";
		xhtml += "<td>"+ i +"</td>";
		xhtml += "<td>"+ val.NAME +"</td>";
		xhtml += "<td>"+ d_xinphep +"</td>";
		xhtml += "<td>"+ status +"</td>";
		xhtml += "<td>"+ d_chapnhan +"</td>";
		xhtml += "<td>"+ Math.round((d_hethan.getTime() - d.getTime()) / 60 / 60 / 1000) +" giờ</td>";
		xhtml += "<td>"+ btn + "</td>";
		xhtml += "</tr>";
	});
	$('#yeucauban').hide(1);
	$('#yeucauban').show(1000);
	$("#yeucauban").html(xhtml);
};

$(document).ready(function() {
	$.ajax({
		url: 'http://localhost:3000/admin/yeucauban',
		type: 'GET',
		dataType: 'json',
		headers: {
			'x-access-token': sessionStorage.access_token
		},
		contentType: 'application/json',
	})
	.done(function(data) {
		loadData(data);
	})
	.fail(function(data, xhr, err) {
		console.log(err);
	});

	$("#yeucauban").on('click', '.btn-accept', function() {
		var dataPost = {
			id: $(this).data('id')
		};

		var jsonPost = JSON.stringify(dataPost);
		$.ajax({
			url: 'http://localhost:3000/admin/yeucauban',
			type: 'PUT',
			dataType: 'json',
			data: jsonPost,
			contentType: 'application/json',
			headers: {
				'x-access-token': sessionStorage.access_token
			},
		})
		.done(function(data) {
			loadData(data);
			//console.log(data);
			swal("Thành công", data.mess, "success");
		})
		.fail(function() {
			console.log("error");
		});
	});

	$("#yeucauban").on('click', '.btn-decline', function() {
		var dataPost = {
			id: $(this).data('id')
		};

		var jsonPost = JSON.stringify(dataPost);

		$.ajax({
			url: 'http://localhost:3000/admin/yeucauban',
			type: 'DELETE',
			dataType: 'json',
			data: jsonPost,
			contentType: 'application/json',
			headers: {
				'x-access-token': sessionStorage.access_token
			},
		})
		.done(function(data) {
			loadData(data);
			swal("Thành công", data.mess, "success");
		})
		.fail(function() {
			console.log("error");
		});
		
	});
});