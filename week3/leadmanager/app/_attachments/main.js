// Peter Hitchcock
// ASD 1308
// Week 2

$('#home').on('pageinit', function(){
    

});

$('#additem').on('pageinit', function(){

    // Validation
    $( "#contactForm" ).validate({
        rules: {
            name: {
                required: true
            },
        }
    });

    // Stores Data to CouchDB WORKING
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
        //localStorage.setItem(id, JSON.stringify(lead));
        //alert("Lead Has Been Saved!");
        //window.location.reload();
        //return false;

        $.couch.db('leadmanager').saveDoc(lead, {
           success: function(data) {

               console.log(data + "\n Document saved");
               alert("Lead Has Been Saved!");
               window.location.reload();
               return false;
           },
           error: function(status) {
               console.log("Error" + status);
           }
        });
    };

    $('#submit').on('click', storeData);

});

// Delete Single
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

// Edit Single
function editSingleLead(key) {
    // Grab Data from Local Storage
    //var key = $(this).data('key');
    //var value = localStorage.getItem(key);
    //var lead = JSON.parse(value);

    //var doc = $(this).data('id');

    //var rev = $('this').data('rev');
     /*
    console.log('clicked');
    console.log(id);
    console.log(rev);
    console.log(valueKey);
    console.log(valueKey.id);
     */

     var doc = 'dee1525f352439bb95d8d238e3008a37';
     // Open Document
    $.couch.db("leadmanager").openDoc(doc, {
        success: function(data) {
            console.log(doc);
            console.log(data.name[1]);
            console.log(data.phone[1]);
            $("#name").val(data.name[1]);
            $("#phone").val(data.phone[1]);
            $("#email").val(data.email[1]);
            $("#date").val(data.date[1]);
        },
        error: function(status) {
            console.log(status);
        }
    });

    //$('additem').page();
    var saveButton = $('#submit');
    saveButton.text("Save Changes");
    saveButton.unbind();
    window.location.reload();
}

// Delete Single Record from CouchDB
     /*
    $('#del').on('click', function(){
        console.log('clicked');

        var ask = confirm("Really? Are You Sure?");
        var id = $(this).data('id');
        var rev = $(this).data('rev');

        var doc = {
            _id: id,
            _rev: rev

        };

         if (ask) {

             //localStorage.removeItem(this.key);
             $.couch.db('leadmanager').removeDoc(doc, {
                success: function(data) {
                    console.log(data);
                },
                error: function(status) {
                    console.log(status);
                }

             });
             //window.location.reload();

         }else{
             alert("Your Lead was not Deleted");
         }
    });
    */



