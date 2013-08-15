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

    $('#submit').on('click', storeData);

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

    $('#clearlocal').on('click', clearLocal);
        
// Create Edit and Delete Links for Each Stored Lead when Displayed NOT WORKING
     function createLeadLinks(key, linkLi) {
         // Add Edit
         var editLead = document.createElement("a");
         editLead.setAttribute("id", "editLead");
         editLead.href = "#";
         editLead.key = key;
         var editText = "Edit";
         editLead.addEventListener("click", editSingleLead);
         editLead.innerHTML = editText;
         linkLi.appendChild(editLead);
         
         // Add LineBreak
         var breakLine = document.createElement("br");
         linkLi.appendChild(breakLine);
         
         // Add Delete
         var deleteLead = document.createElement('a');
         deleteLead.setAttribute("id", "deleteLead");
         deleteLead.href = "#";
         deleteLead.key = key;
         var deleteText = "Delete";
         deleteLead.addEventListener("click", deleteSingleLead);
         deleteLead.innerHTML = deleteText;
         linkLi.appendChild(deleteLead);
         
     }
     
     // Delete Single NOT WORKING
     function deleteSingleLead() {
         var ask = confirm("Really? Are You Sure?");
         if (ask) {
             localStorage.removeItem(this.key);
             window.location.reload();
         }else{
             alert("Your Lead was not Deleted");
         }
     }
     $('#deleteLead').on('click', deleteSingleLead);

     
     // Edit Single NOT WORKING
     function editSingleLead() {
         // Grab Data from Local Storage
         var value = localStorage.getItem(this.key);
         var lead = JSON.parse(value);
        
    
         // Populate Form Fields
         $("#name").value = lead.name[1];
         $("#phone").value = lead.phone[1];
         $("#email").value = lead.email[1];
         $("#date").value = lead.date[1];
         
     
         // Remove Listener from Input
         save.removeEventListener("click", storeData);
         // Change Submit to Say Edit Button
         $("#submit").value = "Edit Lead";
         var editSubmitButton = $("#submit");
         // Save the Key Value Established as a Property of the editSubmit event
         editSubmitButton.addEventListener("click", validation);
         editSubmitButton.key = this.key;
         
     }
