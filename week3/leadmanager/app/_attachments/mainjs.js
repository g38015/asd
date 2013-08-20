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
				console.log(data.rows);
				
				
				$('<li>' + '<a href="#home" class="dynamic"><h2>'+ n +'</h2><p>' + e + '</p><p class="ui-li-aside"><strong>' + d + '</strong></p></a>'+'</li>' 
              ).appendTo('#jsonleads');
			
			//function goToPage(val){
            $('.dynamic').on('click', function () {
                //create the page html template
                var leadPage = $("<div data-role='page' id='page'><div data-role='header'><a data-iconpos='left' data-icon='back' href='#home' data-role='button' data-ajax='false'>Back</a><h1>" + n + "</h1></div><div data-role='content' align='center'>" 
                          + '<h2>' + n + '</h2>' 
                          + '<h3>' + p + '</h3>' 
                          + '<h3>' + e + '</h3>'
                          + '<h3>' + d + '</h3>'
                          + '<a href="#popupMenu" data-rel="popup" data-role="button" data-inline="true" data-transition="slideup" data-icon="bars" data-theme="b">' + "Contact " + n + " By..."
                          + '</a>'
                          + '<div data-role="popup" id="popupMenu" data-theme="a">'
                          + '<ul data-role="listview" data-inset="true" style="min-width:210px;" data-theme="d">'
                          + '<li data-role="divider" data-theme="b"></li>'
                          +   '<li><a href="tel:' + p + '">Phone</a></li>'
                          +   '<li><a href="smsto:' + p + '">Text</a></li>'
                          +   '<li><a href="mailto:' + e + '?Subject=Hello!">Email</a></li></ul>'
                          + '<a href="#" data-role="button" data-inline="true" data-rel="back" data-theme="c">Cancel</a>'
                          + '</div></div></div>');
                          
                  //append the new page to the page container
                  leadPage.appendTo( $.mobile.pageContainer);


                  //go to the newly created page
                  $.mobile.changePage(leadPage);
                  return false
                  
                });	
				
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