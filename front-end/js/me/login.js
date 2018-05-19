<<<<<<< HEAD
<<<<<<< HEAD
$(document).ready(function() {
	$("#btn-sign-up").on('click', function() {
		swal('Người dùng đăng kí');
=======
// Nguyễn Văn Hòa - chức năng đăng kí user

$(function(){
	// $.validator.addMethod("vndate", function (value, element) {
 //        return this.optional(element) || /^\d\d?\/\d\d?\/\d\d\d\d$/.test(value);
 //    });

    $('#registerForm').validate({
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
    		numberphone:{
    			required:true,
    			minlength:10,
    			maxlength:11
    		},
    		mail:{
    			required: true,
    			email: true
    		},
    		type:{
    			required: true
    		},
    		username:{
    			required: true
    		},
    		password: {
    			required: true,
    			minlength: 6
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
    		numberphone:{
    			required:'Bạn chưa cung cấp số điện thoại',
    			minlength:'Số điện thoại phải từ 10 đến 11 số',
    			maxlength:'Số điện thoại phải từ 10 đến 11 số'
    		},
    		mail:{
    			required: 'Bạn chưa cung cấp Mail',
    			email: 'Mail chưa hợp lệ'
    		},
    		type:{
    			required: 'Bạn chưa chọn loại khách hàng'
    		},
    		username:{
    			required: 'Bạn chưa ghi UserName'
    		},
    		password: {
    			required: 'Bạn chưa ghi mật khẩu',
    			minlength: 'Mật khẩu phải lớn hơn hoặc bằng 6 kí tự'
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

$(document).ready(function() {

	$("#btn-sign-up").on('click', function() {
		//swal('Người dùng đăng kí');
>>>>>>> NguyenHoa
=======
$(document).ready(function() {
	$("#btn-sign-up").on('click', function() {
		swal('Người dùng đăng kí');
>>>>>>> Huy
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
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> Huy
		console.log(data);
		//ajax event
	});

	$("#btn-log-in").on('click', function() {
<<<<<<< HEAD
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
=======

		var isValid=$('#registerForm').valid();
		if(isValid){
			// var body={
			// 	captcha_response: grecaptcha.getResponse()
			// };
			$.ajax({

				url: 'http://localhost:3000/Signup',
				dataType: 'json',
				timeout: 10000,
				type: 'POST',
				contentType: 'application/json',
				data: JSON.stringify(data)
			}).done(function(d){
				// if(data.success){
				// 	swal("Đăng kí thành công");
				// }else{
				// 	//grecaptcha.reset();
				// 	swal("Đăng kí thất bại");
				// }
				//alert('Added');
			}).fail(function(xhr,textStatus,error){
				console.log(textStatus);
				console.log(error);
				console.log(xhr);
			});

			console.log(data);
			//ajax event
		}
	});

	//----------------------------------------------------------------

	$("#btn-log-in").on('click', function() {
		swal('Người dùng đăng nhập');
		//ajax event
	});

>>>>>>> NguyenHoa
=======
		swal('Người dùng đăng nhập');
		//ajax event
	});
>>>>>>> Huy
});