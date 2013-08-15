// Peter Hitchcock
// ASD 1308
// Week 2

$('#home').on('pageinit', function(){
  // Loads json from ajax when Clicked  
  $('#jsonbtn').on('click', function () {
    getJson(); 
  });
  // Loads xml from ajax when Clicked 
  $('#xmlbtn').on('click', function () {   
    getXml();     
  });
  // Loads local when Clicked 
  $('#localbtn').on('click', function () {    
    getLocal();   
  });
  // Loads all get functions; JSON XML and LOCAL when Clicked 
  $('.all').on('click', function () {
   getJson();      
   getXml();
   getLocal();    
  });
});

// JSON AJAX function
var getJson = function() {
  console.log('JSON Loaded!');
  $("#jsonleads").empty();

    $.ajax({
      url: "xhr/data.json",
      type: "GET",
      dataType: "json",
        success: function(response){
          $.each(response, function(key, val) {
                  
          $('#jsonleads').append(leadsLink(val));

          $('#jsonleads').listview('refresh');

            //Creates a lead link list item
            function leadsLink(val){

              //debugger;
              return '<li><a href="#page" class="dynamic"><h2>' + val.name + '</h2><p>' + val.email + '</p><p class="ui-li-aside"><strong></strong></p></a></li>';
                  
            };

            //function goToPage(val){
            $('.dynamic').on('click', function () {
                //create the page html template
                var leadPage = $("<div data-role='page' id='page'><div data-role='header'><a data-iconpos='left' data-icon='back' href='#home' data-role='button' data-ajax='false'>Back</a><h1>" + val.name + "</h1></div><div data-role='content' align='center'>" 
                          + '<h2>' + val.name + '</h2>' 
                          + '<h3>' + val.phone + '</h3>' 
                          + '<h3>' + val.email + '</h3>'
                          + '<h3>' + val.date + '</h3>'
                          + '<a href="#popupMenu" data-rel="popup" data-role="button" data-inline="true" data-transition="slideup" data-icon="bars" data-theme="b">' + "Contact " + val.name + " By..."
                          + '</a>'
                          + '<div data-role="popup" id="popupMenu" data-theme="a">'
                          + '<ul data-role="listview" data-inset="true" style="min-width:210px;" data-theme="d">'
                          + '<li data-role="divider" data-theme="b"></li>'
                          +   '<li><a href="tel:' + val.phone + '">Phone</a></li>'
                          +   '<li><a href="smsto:' + val.phone + '">Text</a></li>'
                          +   '<li><a href="mailto:' + val.email + '?Subject=Hello!">Email</a></li></ul>'
                          + '<a href="#" data-role="button" data-inline="true" data-rel="back" data-theme="c">Cancel</a>'
                          + '</div></div></div>');
                          
                  //append the new page to the page container
                  leadPage.appendTo( $.mobile.pageContainer);


                  //go to the newly created page
                  $.mobile.changePage(leadPage);
                  return false
                  
                });


            });
                
        }

    }); 
};

// XML AJAX Function
var getXml = function() {
  console.log('XML Loaded!');
  $("#xmlleads").empty();

    $.ajax({
      url: "xhr/data.xml",
      type: "GET",
      dataType: "xml",
        success: function(response){
          $(response).find('leads lead').each(function (){
                   
            // Add to listview with link to showpage
            var name = $(this).find('name').text();
            var email = $(this).find('email').text();
            var phone = $(this).find('phone').text();
            var date = $(this).find('date').text();
            $('<li>' + '<a href="#page" class="dynamic"><h2>'+ name +'</h2><p>' + email + '</p></a>'+'</li>' 
              ).appendTo('#xmlleads');
                // Create Dynamic showpage
                //var email = $(this).find('email').text();
                $('.dynamic').on('click', function () {
                //create the page html template
                var leadPage = $("<div data-role='page' id='page'><div data-role='header'><a data-iconpos='left' data-icon='back' href='#home' data-role='button' data-ajax='false'>Back</a><h1>" + name + "</h1></div><div data-role='content' align='center'>" 
                          + '<h2>' + name + '</h2>' 
                          + '<h3>' + phone + '</h3>' 
                          + '<h3>' + email + '</h3>'
                          + '<h3>' + date + '</h3>'
                          + '<a href="#popupMenu" data-rel="popup" data-role="button" data-inline="true" data-transition="slideup" data-icon="bars" data-theme="b">' + "Contact " + name + " By..."
                          + '</a>'
                          + '<div data-role="popup" id="popupMenu" data-theme="a">'
                          + '<ul data-role="listview" data-inset="true" style="min-width:210px;" data-theme="d">'
                          + '<li data-role="divider" data-theme="b"></li>'
                          +   '<li><a href="tel:' + phone + '">Phone</a></li>'
                          +   '<li><a href="smsto:' + phone + '">Text</a></li>'
                          +   '<li><a href="mailto:' + email + '?Subject=Hello!">Email</a></li></ul>'
                          + '<a href="#" data-role="button" data-inline="true" data-rel="back" data-theme="c">Cancel</a>'
                          + '</div></div></div>');
                          
                  //append the new page to the page container
                  leadPage.appendTo( $.mobile.pageContainer);


                  //go to the newly created page
                  $.mobile.changePage(leadPage);
                  return false
                });
                    
          })
          $('#xmlleads').listview('refresh');

        },
        error: function() {
          $('#leads').text('failed to load feed');
      }

  });

};

// Local Storage Function
var getLocal = function(){
  console.log('Local Loaded!');
  $("#localleads").empty();
    if (localStorage.length === 0) {
        alert("You Have No Leads Please Add One");
    } else {
           
      //Write local data from local storage to browser
      for (var i = 0, len=localStorage.length; i<len; i++) {
        var l = localStorage.length;
        var key = localStorage.key(i);
        var value = localStorage.getItem(key);
        var obj = JSON.parse(value);

                    console.log(l);
                    console.log(key);
                    console.log(value);
                    console.log(obj);

        // Add li to lead page
        $('<li>' + '<a href="#page" class="dynamic"><h2>'+ obj.name[1] +'</h2><p>' + obj.email[1] + '</p></a>'+'</li>').appendTo('#localleads');
  

          // Local Storage Dynamic Page
          $('.dynamic').on('click', function () {

              //create the dynamic page html template
              var leadPage = $("<div data-role='page' id='page'><div data-role='header'><a data-iconpos='left' data-icon='back' href='#home' data-role='button' data-ajax='false'>Back</a><h1>" + obj.name[1] + "</h1></div><div data-role='content' align='center'>" 
                          + '<h2>' + obj.name[1] + '</h2>' 
                          + '<h3>' + obj.phone[1] + '</h3>' 
                          + '<h3>' + obj.email[1] + '</h3>'
                          + '<h3>' + obj.date[1] + '</h3>'
                          + '<a href="#popupMenu" data-rel="popup" data-role="button" data-inline="true" data-transition="slideup" data-icon="bars" data-theme="b">' + "Contact " + obj.name[1] + " By..."
                          + '</a>'
                          + '<div data-role="popup" id="popupMenu" data-theme="a">'
                          + '<ul data-role="listview" data-inset="true" style="min-width:210px;" data-theme="d">'
                          + '<li data-role="divider" data-theme="b"></li>'
                          +   '<li><a href="tel:' + obj.phone[1] + '">Phone</a></li>'
                          +   '<li><a href="smsto:' + obj.phone[1] + '">Text</a></li>'
                          +   '<li><a href="mailto:' + obj.email[1] + '?Subject=Hello!">Email</a></li></ul>'
                          + '<a href="#" data-role="button" data-inline="true" data-rel="back" data-theme="c">Cancel</a>'
                          + '</div></div></div>');
                          
              //append the new page to the page container
              leadPage.appendTo( $.mobile.pageContainer);

              //go to the newly created page
              $.mobile.changePage(leadPage);
              return false
            });

          } 
          $('#localleads').listview('refresh');
    }   
        
};

