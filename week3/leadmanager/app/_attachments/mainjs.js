
$(document).on('pageinit', '#home', function(){



    $.couch.db("leadmanager").view("leadmanager/leads", {
		success: function(data){
		$('#jsonleads').empty();
		$.each(data.rows, function(index, value){
			
			console.log(value.key);
			var item = (value.value || value.doc);
			console.log(item);
			console.log(item.name);
			console.log(index);

			$("#jsonleads").append(
				$('<li>').append(
					$('<a id="'+value.key+'">')
                          .attr("href", "program.html?program=" + item.name[1])
                          .text(item.name[1])
					)
				)

			});
			$('#jsonleads').listview('refresh');
		}
	});

});
/*
urlVars = function () {
    var urlPairs;
    var urlData = $($.mobile.activePage).data("url");
    var urlParts = urlData.split('?');

    urlPairs = urlParts[0].split('&');
    console.log(urlPairs);
    var urlValues = {};
    for (var pair in urlPairs) {
        var keyValue = urlPairs[pair].split('=');
        var key = decodeURIComponent(keyValue[0]);
        var value = decodeURIComponent(keyValue[1]);
        urlValues[key] = value;
    }
    return (urlValues);

};


$(document).on('pageinit', '#program', function(){
   var program = urlVars()["program"];
    console.log(program);
    $.couch.db('leadmanager').view('leadmanager/programCourses', {
        success: function(data){
            $('#s').empty();
            $.each(data.rows, function(index, value){
                console.log(value);
                var item = (value.value || value.doc);
                console.log(item);
                console.log(item.name);
                $("#s").append(
                    $('<li>').append(
                        $('<a>')
                            .attr("href", "program.html?program=" + item.name)
                            .text(item.name)
                    )
                )
            });
            $('#s').listview('refresh');
        }

    });



});
 */