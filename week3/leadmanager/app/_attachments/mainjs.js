$(document).ready(function() {
	
	//var getJson = function() {
	
	$.ajax({
		"url": "_view/leads",
		"dataType": "json",
		"success": function(data) {
			$.each(data.rows, function(index, lead){
				var n = lead.value.name;
				var e = lead.value.email;
				var p = lead.value.phone;
				var d = lead.value.date;
				
				console.log(data);
				console.log(n);
				console.log(e);
				console.log(p);
				console.log(d);
				
				$("#jsonleads").append(
					$('<li>').append(
						$('<a>').attr("href", "#").text(n)
					)				
					
				);
			});
			$('#jsonleads').listview('refresh');
		}
	});
	
	//};
});

/*
$('#jsonbtn').on('click', function () {
    getJson(); 
  });
  */