$(document).ready(function() {
	var id_user=localStorage.id_token;
	
	//Nhận xét sản phẩm  
	// Lấy ID gửi từ URL
	function getParams() {
	    var idx = document.URL.indexOf('?');
	    var params = new Array();
	    if (idx != -1) {
	        var pairs = document.URL.substring(idx + 1, document.URL.length).split('&');
	        for (var i = 0; i < pairs.length; i++) {
	            nameVal = pairs[i].split('=');
	            params[nameVal[0]] = nameVal[1];
	        }
	    }
	    return params;
		}

	$(function(){
		//Gọi hàm lấy ID từ URL
		params = getParams();
		var id=unescape(params["id"]);
		if(id!=null)
		{
			$.ajax({
				url:'http://localhost:3000/info/'+id,
				dataType: 'json',
				type: 'GET',
	        	timeout: 10000
			}).done(function(data){
				$.each(data,function(idx,item){
				var data={
					idSP: $("#idSP").val(item.Ten)
				}	
			});
		});
		}

		//Xuất thông in của người dùng để họ chỉnh sửa thông tin
		$.ajax({
			url:'http://localhost:3000/info/changeInfo/'+id_user,
			dataType: 'json',
        	timeout: 10000,
        	contentType: "application/json"
		}).done(function(data){
			$.each(data,function(idx,item){
			var data={
				name: $('#name').val(item.NAME),
				address: $("#address").val(item.ADDRESS),
				phone: $("#phone").val(item.PHONE),
				mail: $("#mail").val(item.EMAIL),
			}	
		});
	});

		// Xuất thông tin đánh giá
		$.ajax({
			url:'http://localhost:3000/info/evaluation/'+id_user,
			dataType: 'json',
        	timeout: 10000,
        	contentType:"application/json"
		}).done(function(data){
			var i=0;
			$.each(data,function(idx,item){
				var tr=
				'<tr>'+
					'<td>'+ i++ + '</td>'+
					'<td>'+ item.NAME + '</td>'+
					'<td>'+ item.ThoiGian + '</td>'+
					'<td>'+ item.LoiNhanXet + '</td>'+
				'</tr>';
				$('#list-evaluation').append(tr);
			var data={
				sorce: $('#sorce-evaluation').val(item.DiemDanhGia)
			}
			});
		});

		// Xuất thông tin sản phẩm yêu thích
		$.ajax({
			url:'http://localhost:3000/info/favorite/'+id_user,
			dataType: 'json',
        	timeout: 10000,
        	contentType:"application/json"
		}).done(function(data){
			var i=0;
			$.each(data,function(idx,item){
				i++;
				var tr=
				'<tr>'+
					'<td>'+ i + '</td>'+
					'<td><a href="ChiTietSanPham.html?id='+item.SanPham+'">'+ item.Ten + '</a></td>'+
				'</tr>';
				$('#list-favorite').append(tr);
			});
		});

		//Xuất thông tin sản phẩm tham gia đấu giá
		$.ajax({
			url:'http://localhost:3000/info/auction/'+id_user,
			dataType: 'json',
        	timeout: 10000,
        	contentType:"application/json"
		}).done(function(data){
			var i=0;
			$.each(data,function(idx,item){
				i++;
				var tr=
				'<tr>'+
					'<td>'+ i + '</td>'+
					'<td><a href="ChiTietSanPham.html?id='+item.SanPham+'">'+ item.Ten + '</a></td>'+
				'</tr>';
				$('#list-auction').append(tr);
			});
		});

		//Xuất danh sách sản phẩm đã thắng
		$.ajax({
			url:'http://localhost:3000/info/win/'+id_user,
			dataType: 'json',
        	timeout: 10000,
        	contentType:"application/json"
		}).done(function(data){
			var i=0;
			$.each(data,function(idx,item){
				i++;
				var tr=
				'<tr>'+
					'<td>'+ i + '</td>'+
					'<td><a href="ChiTietSanPham.html?id='+item.SanPham+'">'+ item.Ten + '</a></td>'+
					'<td>'+ item.GiaDuaRa + '</td>'+
					// '<td'+ modalNhanXetNguoiBan +'</td>'
					'<td>'+ '<a href="nhanxet.html?id='+item.SanPham+'&loai=1"> Nhận xét và đánh giá sản phẩm </a>'  +'</td>'+
					'</tr>';

				$('#list-win').append(tr);
			});
		});
		//Xuất danh sách sản phẩm đang đăng và còn hạn

		$.ajax({
			url:'http://localhost:3000/info/PostedRemain/'+id_user,
			dataType:'json',
			timeout:10000,
			contentType:"application/json"
		}).done(function(data){
			var i=0;
			$.each(data,function(idx,item){
				i++;
				var tr=
				'<tr>'+
					'<td>'+ i + '</td>'+
					'<td><a href="ChiTietSanPham.html?id='+item.ID+'">'+ item.Ten + '</a></td>'+
					'<td>'+ item.ThoiGianConLai + ' phút</td>'+
					'</tr>';

				$('#list-PostedRemain').append(tr);
			});
		});

		//Xuất danh sách sản phẩm đã được bán và nhận xét người mua
		$.ajax({
			url:'http://localhost:3000/info/sold/'+id_user,
			dataType: 'json',
        	timeout: 10000,
        	contentType:"application/json"
		}).done(function(data){
			var i=0;
			$.each(data,function(idx,item){
				i++;
				var tr=
				'<tr>'+
					'<td>'+ i + '</td>'+
					'<td><a href="ChiTietSanPham.html?id='+item.SanPham+'">'+ item.Ten + '</a></td>'+
					// '<td>'+ item.GiaDuaRa + '</td>'+
					'<td>'+ '<a href="nhanxet.html?id='+item.SanPham+'&loai=2"> Nhận xét và đánh giá người mua</a>'  +'</td>'+
					'</tr>';

				$('#list-Sold').append(tr);
			});
		});


		// Valid trang thay đổi thông tin người dùng
	    $('#repairRegisterForm').validate({
	    	rules:{
	    		name:{
	    			required: true
	    		},
	    		birth:{
	    			required: true
	    		},
	    		address:{
	    			required: true
	    		},
	    		phone:{
	    			required:true,
	    			minlength:10,
	    			maxlength:11
	    		},
	    		mail:{
	    			required: true,
	    			email: true
	    		},
	    	},
	    	messages:{
	    		name:{
	    			required: 'Bạn chưa nhập tên'
	    		},
	    		birth:{
	    			required: 'Bạn chưa cung cấp ngày sinh'
	    		},
	    		address:{
	    			required: 'Bạn chưa cung cấp thông tin địa chỉ'
	    		},
	    		phone:{
	    			required:'Bạn chưa cung cấp số điện thoại',
	    			minlength:'Số điện thoại phải từ 10 đến 11 số',
	    			maxlength:'Số điện thoại phải từ 10 đến 11 số'
	    		},
	    		mail:{
	    			required: 'Bạn chưa cung cấp Mail',
	    			email: 'Mail chưa hợp lệ'
	    		},
	    	},

	    	highlight:function(element){
	    		$(element)
	    			.closest('.form-group')
	    			.addClass('has-error');
	    	},

	    	success:function(label){
	    		label.closest('.form-group').removeClass('has-error');
	    		label.remove();
	    	},
	    	errorElement:'span',
	    	errorClass:'help-block'
	    });
	});

	    //Valid thay đổi mật khẩu

	    $('#passForm').validate({
	    	rules:{
	    		pass1:{
	    			required:true
	    		},
	    		pass2:{
	    			required:true
	    		},
	    		pass3:{
	    			required:true,
	    			equalTo:$('#pass2')
	    		}
	    	},
	    	messages:{
	    		pass1:{
	    			required: 'Bạn chưa nhập mật khẩu cũ'
	    		},
	    		pass2:{
	    			required: 'Bạn chưa nhập mật khẩu mới'
	    		},
	    		pass3:{
	    			required: 'Bạn chưa nhập lại mật khẩu mới',
	    			equalTo: 'Mật khẩu nhập lại chưa đúng'
	    		}
	    	},
	    	highlight: function(element) { // hightlight error inputs
            $(element)
                .closest('.form-group')
                .addClass('has-error'); // set error class to the control group
       		 },

       		success: function(label) {
	            // var name = label.attr('for');
	            // $('[name=' + name + ']').closest('.form-group').removeClass('has-error');

	            label.closest('.form-group').removeClass('has-error');
	            label.remove();
       		 },

        errorElement: 'span',
        errorClass: 'help-block'
	    });



	    // Kiểm tra thông tin trang nhận xét
	$('#formComment').validate({
		rules:{
			textComment:{
				required:true
			}
		},
		messages:{
			textComment:{
				required: 'Bạn chưa nhận xét'
			}
		},
		highlight: function(element) { // hightlight error inputs
        $(element)
            .closest('.form-group')
            .addClass('has-error'); // set error class to the control group
       	},
   		success: function(label) {
            label.closest('.form-group').removeClass('has-error');
            label.remove();
   		 },

        errorElement: 'span',
        errorClass: 'help-block'
	    });
	// Cập nhật thông tin người dùng

	$("#btn-update").on('click', function() {
		//swal('Người dùng đăng kí');
		var data = {
			name: $("#name").val(),
			birth: $("#birth").val(),
			address: $("#address").val(),
			phone: $("#phone").val(),
			mail: $("#mail").val(),
			idUser:id_user
		}

		var isValid=$('#repairRegisterForm').valid();
		if(isValid){
			$.ajax({
				url:'http://localhost:3000/info/changeInfo',
				dataType: 'json',
				timeout:10000,
				type:'POST',
				contentType:'application/json',
				data:JSON.stringify(data)
			}).done(function(data){
				if(data.success)
				{
					swal('Cập nhật thông tin thất bại');
				}
				else
				{
					swal('Cập nhật thông tin thành công');
				}
			}).fail(function(xhr,textStatus,error){
				console.log(textStatus);
				console.log(error);
				console.log(xhr);
			});
			console.log(data);
		}
	});

	//Cập nhật mật khẩu
	$("#btn-updatePass").on('click',function(){
		var data={
			pass1: $("#pass1").val(),
			pass2: $("#pass2").val(),
			pass3: $("#pass3").val(),
			idUser:id_user
		}
		var isValid=$('#passForm').valid();
		if(isValid)
		{
			$.ajax({
				url:'http://localhost:3000/info/changePass',
				dataType:'json',
				timeout:10000,
				type:'POST',
				contentType:'application/json',
				data:JSON.stringify(data)
			}).done(function(data){
				if(data.success)
				{
					swal('Cập nhật mật khẩu thất bại');
				}
				else
				{
					swal('Cập nhật thông tin thành công');
				}
			}).fail(function(xhr, textStatus, error) {
            console.log(textStatus);
            console.log(error);
            console.log(xhr);
        });
			console.log(data);
		}
	});

	$("#btn-comment").on('click',function(){
		//Gọi hàm lấy ID từ URL
		params = getParams();
		var data={
			diem:$("#typeEvaluation").val(),
			comment:$("#textComment").val(),
			id:unescape(params["id"]),
			loai:unescape(params["loai"]),
			idUser:id_user
		}
		// var isValid=$('#formComment').valid();
		// if(isValid)
		// {
			$.ajax({
				url:'http://localhost:3000/info/comment',
				dataType:'json',
				timeout:10000,
				type:'POST',
				contentType:'application/json',
				data:JSON.stringify(data)
			}).done(function(data){
				swal("Nhận xét thành công");
			}).fail(function(xhr,textStatus,error){
				swal("Nhận xét thất bại");
				console.log(textStatus);
            	console.log(error);
           	 	console.log(xhr);
			});
			console.log(data);
		// }

	});	

	$("#btn-loguot").on('click', function () {
	localStorage.removeItem('access_token');
	localStorage.removeItem('id_token');
	localStorage.removeItem('user_token');
	localStorage.removeItem('banhang_token');
	window.location = "index.html";
	});

	$( document ).ready(function(){
		if(localStorage.user_token != undefined) {
			$("#user").html(localStorage.user_token);
			$("#logouted").remove();
		} else {
			$("#logined").remove();
		}
	});

		
});
