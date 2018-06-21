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

// <div class="modal fade" id="modal-xemnhanh">
// 	                        <div class="modal-dialog">
// 	                            <div class="modal-content">
// 	                                    <div class="modal-header">
// 	                                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
// 	                                        <h4 class="modal-title">`+item.Ten+`</h4>
// 	                                    </div>
// 	                                    <div class="modal-body">
// 	                                        <div class="form-group">
// 	                                            <img src="http://localhost:3000/`+item.SanPham+`/image1.png" class="img-responsive" alt="Image">
// 	                                            <a href="ChiTietSanPham.html?id=`+item.SanPham+`"><h4><span class="label label-success">`+item.Ten+`</span></h4></a>
// 												<h5>Giá hiện tại: `+item.GiaHienTai+`</h5>
// 												<h5>Giá mua ngay: `+item.GiaMuaNgay+`</h5>
// 												<h5>Thời gian còn lại : `+item.hanban+` phút</h5>
// 												<h5>Số lượt ra giá : `+item.SoLuotRaGia+`</h5>
// 												<p style="height: 36px;">Người đang giữ giá: `+item.NAME+`</p>
// 												<p>
// 													<a href="ChiTietSanPham.html?id=`+item.SanPham+`" class="btn btn-primary" class="btn btn-primary">
// 													<span class="glyphicon glyphicon-eye-open"></span>
// 													Details 
// 													</a> 
// 													<a href="javascript:;" data-id="`+item.ID+`" class="btn btn-warning btn-like-list">
// 													<span class="glyphicon glyphicon-heart"></span>
// 													 Yêu thích
// 													</a>
// 												</p>
// 	                                        </div>
// 	                                    </div>
// 	                                    <div class="modal-footer">
// 	                                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
// 	                                    </div>
// 	                            </div>
// 	                        </div>
// 	                    </div>



var modalXemNhanhFavorite=function(Ten,SanPham,GiaHienTai,GiaMuaNgay,HanBan,SoLuotRaGia,Name)
{
	var temp=`<div class="modal fade" id="modal-xemnhanh">
        <div class="modal-dialog">
            <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title">`+Ten+`</h4>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <img src="http://localhost:3000/`+SanPham+`/image1.png" class="img-responsive" alt="Image">
                            <a href="ChiTietSanPham.html?id=`+SanPham+`"><h4><span class="label label-success">`+Ten+`</span></h4></a>
							<h5>Giá hiện tại: `+GiaHienTai+`</h5>
							<h5>Giá mua ngay: `+GiaMuaNgay+`</h5>
							<h5>Thời gian còn lại : `+HanBan+` phút</h5>
							<h5>Số lượt ra giá : `+SoLuotRaGia+`</h5>
							<p style="height: 36px;">Người đang giữ giá: `+Name+`</p>
							<p>
								<a href="ChiTietSanPham.html?id=`+SanPham+`" class="btn btn-primary" class="btn btn-primary">
								<span class="glyphicon glyphicon-eye-open"></span>
								Details 
								</a> 
								<a href="javascript:;" data-id="`+SanPham+`" class="btn btn-warning btn-like-list">
								<span class="glyphicon glyphicon-heart"></span>
								 Yêu thích
								</a>
							</p>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    </div>
            </div>
        </div>
    </div>`
    return temp;
};
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
					'<td>'+
						`<div>
	                    	<li class="btn btn-success" data-toggle="modal" href='`+ modalXemNhanhFavorite(item.Ten,item.SanPham,item.GiaHienTai,item.GiaMuaNgay,item.hanban,item.SoLuotRaGia,item.NAME)+`'>`+item.Ten+`</li>
	               		</div>`
                	+'</td>'+
				'</tr>';
				$('#list-favorite').append(tr);
			});
		});
var modalXemNhanhDauGia=function(Ten,SanPham,GiaHienTai,GiaMuaNgay,HanBan,SoLuotRaGia,Name,CoDungDau)
{
	var temp=`<div class="modal fade" id="modal-xemnhanh">
        <div class="modal-dialog">
            <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title">`+Ten+`</h4>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <img src="http://localhost:3000/`+SanPham+`/image1.png" class="img-responsive" alt="Image">
                            <a href="ChiTietSanPham.html?id=`+SanPham+`"><h4><span class="label label-success">`+Ten+`</span><span class="badge">`+CoDungDau+`</span></h4></a>
							<h5>Giá hiện tại: `+GiaHienTai+`</h5>
							<h5>Giá mua ngay: `+GiaMuaNgay+`</h5>
							<h5>Thời gian còn lại : `+HanBan+` phút</h5>
							<h5>Số lượt ra giá : `+SoLuotRaGia+`</h5>
							<p style="height: 36px;">Người đang giữ giá: `+Name+`</p>
							<p>
								<a href="ChiTietSanPham.html?id=`+SanPham+`" class="btn btn-primary" class="btn btn-primary">
								<span class="glyphicon glyphicon-eye-open"></span>
								Details 
								</a> 
								<a href="javascript:;" data-id="`+SanPham+`" class="btn btn-warning btn-like-list">
								<span class="glyphicon glyphicon-heart"></span>
								 Yêu thích
								</a>
							</p>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    </div>
            </div>
        </div>
    </div>`
    return temp;
};
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
					'<td><a href="ChiTietSanPham.html?id='+item.ID+'">'+ item.Ten + '   </a><span class="badge"> '+item.CoDungDau+' </span></td>'+
					'<td>'+
						`<div>
	                    	<li class="btn btn-success" data-toggle="modal" href='`+ modalXemNhanhDauGia(item.Ten,item.SanPham,item.GiaHienTai,item.GiaMuaNgay,item.hanban,item.SoLuotRaGia,item.NAME,item.CoDungDau)+`'>`+item.Ten+`</li>
	               		</div>`
                	+'</td>'+
				'</tr>';
				$('#list-auction').append(tr);
			});
		});
var modalXemNhanhDaThang=function(Ten,SanPham,GiaDaThang,Name)
{
	var temp=`<div class="modal fade" id="modal-xemnhanh">
        <div class="modal-dialog">
            <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title">`+Ten+`</h4>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <img src="http://localhost:3000/`+SanPham+`/image1.png" class="img-responsive" alt="Image">
                            <a href="ChiTietSanPham.html?id=`+SanPham+`"><h4><span class="label label-success">`+Ten+`</span></h4></a>
							<h5>Người bán: `+Name+`</h5>
							<p style="height: 36px;">Giá đấu giá: `+GiaDaThang+`</p>
							<p>
								<a href="ChiTietSanPham.html?id=`+SanPham+`" class="btn btn-primary" class="btn btn-primary">
								<span class="glyphicon glyphicon-eye-open"></span>
								Details 
								</a> 
								<a href="javascript:;" data-id="`+SanPham+`" class="btn btn-warning btn-like-list">
								<span class="glyphicon glyphicon-heart"></span>
								 Yêu thích
								</a>
							</p>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    </div>
            </div>
        </div>
    </div>`
    return temp;
};
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
					'<td>'+
						`<div>
	                    	<li class="btn btn-success" data-toggle="modal" href='`+ modalXemNhanhDaThang(item.Ten,item.SanPham,item.GiaDuaRa,item.NAME)+`'>`+item.Ten+`</li>
	               		</div>`
                	+'</td>'+
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
					localStorage.user_token = $("#name").val();
					swal('Cập nhật thông tin thành công');
				}
			}).fail(function(xhr,textStatus,error){
				console.log(textStatus);
				console.log(error);
				console.log(xhr);
			});
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
				swal("Bạn đã nhận xét người bán này rồi");
				console.log(textStatus);
            	console.log(error);
           	 	console.log(xhr);
			});
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
