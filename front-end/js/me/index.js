/*$.ajax({
	url: 'http://localhost:3000',
	type: 'GET',
	dataType: 'json',
	data: {},
})
	.done(function (data) {
		$("#test").html(data.mess);
		swal('Đã load trang test');
	})
	.fail(function (error) {
		console.log(error);
	});*/
$("#btn-loguot").on('click', function () {
	localStorage.access_token = undefined;
});

$( document ).ready(function(){
	HandlebarsIntl.registerWith(Handlebars);
	loadTop5RaGia();
});

var loadTop5RaGia = function () {
	$('.loader').show();

	$.ajax({
		url: 'http://localhost:3000/login',
		dataType: 'json',
		timeout: 10000
	}).done(function (data) {
		var source = $('#product-template').html();
		var template = Handlebars.compile(source);
		var html = template(data);
		console.log(html);
		$('#Top5RaGia-list').append(html);

		$('#Top5RaGia-list div[style]').fadeIn(1000, function () {
			$(this).removeAttr('style');
		});

        //CUR_PAGE++;
        if (data.hasMore === false) {
            $('#btnMore').hide();
        }

        $('.loader').hide();
	});
};
