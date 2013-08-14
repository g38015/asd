// Peter Hitchcock
// ASD 1308
// Week 2

$('#home').on('pageinit', function(){
    

    $("#local").on('click', function(){

        $("#localleads").empty();
        /*
        if (localStorage.length === 0) {
        alert("You Have No Leads Please Add One");
        } else {
        */   
            //Write local data from local storage to browser
            for (var i = 0, len=localStorage.length; i<len; i++) {
                
                var key = localStorage.key(i);
                var obj = JSON.parse(localStorage.getItem(key));

                    console.log(len);
                    console.log(key);
                    console.log(obj);
                    //console.log(obj.name[1]);
                    var makeSubList = $("<li></li>");
                    var makeSubLi = $( "<h3>"+obj.name[1]+"</h3>"+
                                        "<p><strong>"+obj.email[1]+"</strong></p>"+
                                        "<p>"+obj.phone[1]+"</p>" +
                                        "<p>"+obj.date[1]+"</p>" );
                    var makeLink = $("<a href='#' id='"+key+"'>Edit</a>");
                    makeLink.on('click', function(){
                    console.log("This is my key: "+this.id);
                    });
                    makeLink.html(makeSubLi);
                    makeSubList.append(makeLink).appendTo("#locallead");
                    // Add li to lead page
                    //$('<li>' + '<a href="#showLead">'+ obj.name[1] + '</a>'+'</li>').appendTo('#localleads');
                    /*
                    // Add output to show page
                    var output='';
                    output += '<h2>'+ obj.name[1] +'</h2>';
                    output += '<h3>'+ obj.phone[1] +'</h3>';
                    output += obj.email[1];
                    output += '<a href="#additem" id="editlead" data-role="button" data-inline="true" data-ajax="false" data-theme="b">' + 'Edit' + '</a>' 
                    output += '<a href="#showLead" id="deletelead" data-role="button" data-inline="true" data-ajax="false" data-theme="b">' + 'Delete' + '</a>' 
                    $('#myleads').html(output);
                    */
              
            


            }; 
            $('#localleads').listview('refresh');
            //$('#localleads').listview('refresh');
        //}   
        
    });

    //$('#local').on('click', getData);

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
        
// Delete Single Lead
    function deleteSingleLead() {
         var ask = confirm("Really? Are You Sure?");
         if (ask) {
             localStorage.removeItem(this.key);
             window.location.reload();
         }else{
             alert("Your Lead was not Deleted");
         }
    }

    $('#deleteLead').on('click', deleteSingleLead)

