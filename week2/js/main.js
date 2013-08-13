// Peter Hitchcock
// ASD 1308
// Week 2

$('#home').on('pageinit', function(){
    
    $('#json').on('click', function () {
        
        //$('#leads').empty();
        $.ajax({
            url: "xhr/data.json",
            type: "GET",
            dataType: "json",
            success: function(response){
                console.log(response.lead.length);
                for (var i=0, j=response.lead.length; i<j; i++) {
                    
                    // Add li to lead page
                    var l = response.lead[i];
                    $('<li>' + '<a href="#showLead">'+ l.name + '</a>'+'</li>').appendTo('#leads');

                    // Add output to show page
                    var output='';
                    output += '<h2>'+ l.name +'</h2>';
                    output += '<h3>'+ l.email +'</h3>';
                    output += l.phone; 
                    $('#myleads').html(output);
                        
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
                   
                   // Add li to lead page
                    var name = $(this).find('name').text();
                    $('<li>' + '<a href="#showLead">'+ name + '</a>'+'</li>' 
                    ).appendTo('#leads');
                    
                    // Add output to show page
                    var eamil = $(this).find('email').text();
                    var output='';
                    output += '<h2>'+ name +'</h2>';
                    output += '<p>'+ email + '</p>';
                    $('#myleads').html(output);
                    
                })

                $('#leads').listview('refresh');

            },
            
            error: function() {
                $('#leads').text('failed to load feed');

            }

        });
        
    });

    var getData = function(){
    if (localStorage.length === 0) {
        //$("#popupDialog").popup();
        alert("You Have No Leads Please Add One");
        } else {
            //Write local data from local storage to browser
            for (var i = 0, len=localStorage.length; i<len; i++) {
                var l = localStorage.length;
                var key = localStorage.key(i);
                var value = localStorage.getItem(key);
                var obj = JSON.parse(value);
                    // Add li to lead page
                    $('<li>' + '<a href="#showLead">'+ obj.name[1] + '</a>'+'</li>').appendTo('#leads');
                    // Add output to show page
                    var output='';
                    output += '<h2>'+ obj.name[1] +'</h2>';
                    output += '<h3>'+ obj.phone[1] +'</h3>';
                    output += obj.email[1]; 
                    $('#myleads').html(output);
                    
            } 
             //window.location.reload();
            $('#leads').listview('refresh');
        }  

    };

    $('#local').on('click', getData);

});

$('#additem').on('pageinit', function(){
    
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



