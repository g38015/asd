$('#json').on('click', function () {
        
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
                  return '<li><a href="#showLead" class="dynamic">' + val.name + '</a></li>';
                  }

                  //function goToPage(val){
                    $('.dynamic').on('click', function () {
                  //create the page html template
                  var leadPage = $("<div data-role='page' id='page'><div data-role='header'><a data-iconpos='left' data-icon='back' href='#home' data-role='button' data-rel='back' data-ajax='false'>Back</a><h1>" + 'Lead Name ' + val.name + "</h1></div><div data-role='content' align='center'>" 
                          + '<h2>' + val.name + '</h2>' 
                          + '<h3>' + val.phone + '</h3>' 
                          + '<h3>' + val.email + '</h3>'
                          + '<h3>' + val.date + '</h3>'
                          + '<a href="#popupMenu" data-rel="popup" data-role="button" data-inline="true" data-transition="slideup" data-icon="gear" data-theme="b">' + "Contact By..."
                          + '</a>'
                          + '<div data-role="popup" id="popupMenu" data-theme="a">'
                          + '<ul data-role="listview" data-inset="true" style="min-width:210px;" data-theme="d">'
                          + '<li data-role="divider" data-theme="b"></li>'
                          +   '<li><a href="tel:' + val.phone + '">Phone</a></li>'
                          +   '<li><a href="smsto:' + val.phone + '">Text</a></li>'
                          +   '<li><a href="mailto:' + val.email + '?Subject=Hello!">Email</a></li></ul>'
                          + '<a href="#" data-role="button" data-inline="true" data-rel="back" data-theme="c">' + "Cancel" + '</a><a href="#" data-role="button" data-inline="true" data-rel="back" data-transition="flow" data-theme="b">' + "Edit" +'</a>'
                          + '</div></div></div>');
                          


                  //append the new page to the page container
                  leadPage.appendTo( $.mobile.pageContainer );


                  //go to the newly created page
                  $.mobile.changePage(leadPage);
                  return false
                  //} 
                  });


                });
                
            }

        }); 

    });




$('#xml').on('click', function () {
        
        $.ajax({
            url: "xhr/data.xml",
            type: "GET",
            dataType: "xml",
            success: function(response){
                $(response).find('leads lead').each(function (){
                   // Add to listview with link to showpage
                    var name = $(this).find('name').text();
                    $('<li>' + '<a href="#showLead" class="dynamic">'+ name + '</a>'+'</li>' 
                    ).appendTo('#xmlleads');
                    // Create Dynamic showpage
                    var email = $(this).find('email').text();
                    $('.dynamic').on('click', function () {
                        // Page structure
                        var newPage = $("<div data-role='page' id='page'><div data-role=header><a data-iconpos='left' data-icon='back' href='#show' data-role='button' data-rel='back' data-ajax='false'>Back</a><h1>" + name + "</h1></div><div data-role=content>" 
                          + '<h1>' + name + '</h1>' 
                          + '<h2>' + email + '</h2>' 
                          + '<a href="#additem" id="btn" data-role="button" data-inline="true" data-ajax="false" data-theme="b">' + 'Edit' + '</a>' 
                          + '</div></div>');

                          // Append the new page into pageContainer
                          newPage.appendTo($.mobile.pageContainer);

                          // Move to this page by ID '#page'
                          $.mobile.changePage('#page');

                          });
                    
                })
                $('#xmlleads').listview('refresh');

            },
            error: function() {
                $('#leads').text('failed to load feed');
            }

        });
        
    });

