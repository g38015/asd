$('#json').on('click', function () {
        
        $.ajax({
            url: "xhr/data.json",
            type: "GET",
            dataType: "json",
            success: function(response){
                $.each(response, function(key, val) {
                    // Add to listview with link to showpage
                   $('<li>' + '<a href="#showLead" class="dynamic">'+ val.name + '</a>'+'</li>').appendTo('#jsonleads');
                    // Create Dynamic page
                      $('.dynamic').on('click', function () {
                        // Page structure
                        var newPage = $("<div data-role='page' id='page'><div data-role=header><a data-iconpos='left' data-icon='back' href='#show' data-role='button' data-rel='back' data-ajax='false'>Back</a><h1>" + val.name + "</h1></div><div data-role=content>" 
                          + '<h1>' + val.name + '</h1>' 
                          + '<h2>' + val.phone + '</h2>' 
                          + '<h2>' + val.email + '</h2>'
                          + '<h2>' + val.date + '</h2>'
                          + '<a href="#additem" id="btn" data-role="button" data-inline="true" data-ajax="false" data-theme="b">' + 'Edit' + '</a>' 
                          + '</div></div>');

                          // Append the new page into pageContainer
                          newPage.appendTo($.mobile.pageContainer);

                          // Move to this page by ID '#page'
                          $.mobile.changePage('#page');

                          });
                          
                });
                $('#jsonleads').listview('refresh');
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

