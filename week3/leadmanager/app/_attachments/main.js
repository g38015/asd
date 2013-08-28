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



