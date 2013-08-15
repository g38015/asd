// Peter Hitchcock
// ASD 1308
// Week 2


$('#additem').on('pageinit', function(){

    // Validation 
    $( "#contactForm" ).validate({
        rules: {
            name: {
                required: true,
                min: 3
            },
        }
    });
    
    // Stores Data to Local Storage
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

// Clear Function
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

