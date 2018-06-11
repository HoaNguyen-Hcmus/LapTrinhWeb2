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


var formatCurrent = function(data) {
	data = String(data);
	var flag = 0,
		result = "",
		t = "", 
		arr	= data.split('');

	for (var i = arr.length - 1; i >= 0; i--) {
		if(flag == 3) {
			t = t.concat("", ".");
			flag = 0;
		}
		t += data.charAt(i);
		flag++;
	}

	for (var i = t.length - 1; i >= 0; i--) {
		result = result.concat(t[i], "");
	}

	result = result.concat(" vnđ", "");
	return result;
}

var encodeUser = function(data) {
	data = String(data);
	var i = 0,
		result = "", 
		arr	= data.split('');

	//alert(str.length);
	$(arr).each(function(index, value) {
		if(i >= 3) {
			result = result.concat("", "*");
		} else {
			result += data.charAt(i);
		}
		i++;	
	});
	return result;
}