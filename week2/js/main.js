// Peter Hitchcock
// ASD 1308
// Week 2



$('#home').on('pageinit', function(){
    
    $('#jsontest').on('click', function () {
        
        
        //$('#leads').empty();
        $.ajax({
            url: "xhr/data.json",
            type: "GET",
            dataType: "json",
            success: function(response){
                console.log(response.lead.length);
                for (var i=0, j=response.lead.length; i<j; i++) {
                    console.log(i, j);
                    var l = response.lead[i];
                    $('<li>' + '<a href="#blogpost">'+ l.name + '</a>'+'</li>').appendTo('#leads');

                    
                    var output='';
                    output += '<h2>'+ l.name +'</h2>';
                    output += '<h3>'+ l.email +'</h3>';
                    output += l.phone; 
                    $('#mypost').html(output);
                        
                   
                    /*
                    for (var n in response) {
                      var id = Math.floor(Math.random()*10000001);
                        localStorage.setItem(id, JSON.stringify(response[n]));

                    }
                    */
                };
                
                $('#leads').listview('refresh');
            }

        });
        
    });

    $('#xml').on('click', function () {
        
        
        //$('#leads').empty();
        $.ajax({
            url: "xhr/data.xml",
            type: "GET",
            dataType: "xml",
            success: function(response){
                console.log("xml data loaded");
                console.log(response);
                $(response).find('leads lead').each(function (){
                    // Parse for li
                    var name = $(this).find('name').text();
                    $('<li>' + '<a href="#blogpost">'+ name + '</a>'+'</li>' 
                    ).appendTo('#leads');
                    // Parse for show page
                    var eamil = $(this).find('email').text();
                    var output='';
                    output += '<h2>'+ name +'</h2>';
                    output += '<p>'+ email + '</p>';
                    $('#mypost').html(output);
                    


                })
                $('#leads').listview('refresh');

            // Extract relevant data from XML
            //var xml_node = $('speakers',data);
                //console.log( xml_node.find('speaker >name').text() );
            },
            
            error: function() {
                $('#leads').text('failed to load feed');

            }

        });
        
    });
    var getData = function(){
    if (localStorage.length === 0) {
        alert("You Have No Leads, Defalt Lead Info Added");
        
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


                    $('<li>' + '<a href="#blogpost">'+ obj.name[1] + '</a>'+'</li>').appendTo('#leads');

                    
                    var output='';
                    output += '<h2>'+ obj.name[1] +'</h2>';
                    output += '<h3>'+ obj.phone[1] +'</h3>';
                    output += obj.email[1]; 
                    $('#mypost').html(output);
                    
                //loadImage(obj.bedrooms[1], newsubLi);
                
                //createLeadLinks(localStorage.key(i), linkLi);
            } 
            $('#leads').listview('refresh');

        }   
        
    };

    $('#local').on('click', getData);


});

$('#additem').on('pageinit', function(){
    //any other code needed for addItem page goes here
    
    var storeData = function(data, key){
    
    // if there is no key means brand new lead and need a new key
    if(!key) {
    
        var id             = Math.floor(Math.random()*10000001);
        
    }else{
        // set the id to the existing key we are editing
            id             = key;
        }
        // Get all form field values and store in object
        // Object properties contain array form label and input value
        //getSelectedRadio();
        var lead           = {};
            lead.name      = ["Name:", $("#name").val()];
            lead.phone     = ["Phone:", $("#phone").val()];
            lead.email     = ["Email:", $("#email").val()];
            lead.date      = ["Date:", $("#mydate").val()];            
            
        // Save data to local storage Use stringify to convert object to a string
        localStorage.setItem(id, JSON.stringify(lead));
        alert("Lead Has Been Saved!");
        window.location.reload();
        return false;
    
    };

    $('#submit').on('click', storeData);

});

// Clear Function Global
var clearLocal = function(){
        if (localStorage.length === 0) {
         alert("There Are No Leads to Delete");
        } else {
            localStorage.clear();
            alert("All Leads Have Been Deleted!");
            window.location.reload();
            return false;
        }
    };

    $('#clear').on('click', clearLocal);



/*

        $.ajax({
            url: "xhr/data.json",
            type: "GET",
            dataType: "json",
            success: function(response){
                console.log(response.lead.length);
                for (var i=0, j=response.lead.length; i<j; i++) {
                    

                    var l = response.lead[i];
                    console.log(l.name);
                    var output='';
                    output += '<h2>'+ l.name +'</h2>';
                    output += l.bio; 
                    $('#mypost').html(output);
                   
                    

                 
                   

                };
                
                
            }

        });

*/

