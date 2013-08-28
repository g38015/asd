// Peter Hitchcock
// ASD 1308
// Week 2


$('#additem').on('pageinit', function(){

    // Validation 
    $( "#contactForm" ).validate({
        rules: {
            name: {
                required: true
                
            },
        }
    });
    
    // Stores Data to Local Storage WORKING
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

    $('#submitLead').on('click', storeData);

});

// Clear All Function WORKING
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

    $('#deleteall').on('click', clearLocal);
        

     // Delete Single WORKING
     function deleteSingleLead(key) {
         var ask = confirm("Really? Are You Sure You Want to Delete this Lead?");
         if (ask) {
             localStorage.removeItem(key);
             window.location.reload();
         }else{
             alert("Your Lead was not Deleted");
         }
         window.location.reload();
              
     }

     // Edit Single WORKING EXEPT FOR VALIDATE
      function editSingleLead(key) {
         // Grab Data from Local Storage
         //var key = $(this).data(key);
         var value = localStorage.getItem(key);
         var lead = JSON.parse(value);
            
            console.log(key);
            console.log(value);
            console.log(lead.name[1]);
            console.log(lead.phone[1]);
            console.log(lead.email[1]);
            console.log(lead.date[1]);
            
         // Populate Form Fields
         $("#name").val(lead.name[1]);
         $("#phone").val(lead.phone[1]);
         $("#email").val(lead.email[1]);
         $("#date").val(lead.date[1]);
         
         //$('additem').page();
         //$('#submitLead').hide();
         
         var saveButton = $('#submitLead');
         saveButton.text("Save Changes");
         //window.location.reload();
         
     }

     