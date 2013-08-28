
$(document).on('pageinit', '#home', function(){

    $.couch.db("leadmanager").view("leadmanager/leads", {
		success: function(data){
		$('#jsonleads').empty();
		$.each(data.rows, function(index, value){
			
			console.log(value.key);
            console.log(value);

			var item = (value.value || value.doc);

			console.log(item);
			console.log(item.name[1]);
			console.log(index);


            $('#jsonleads').append(leadsLink(item, value));

        });
        $('#jsonleads').listview('refresh');

        }

    });

});

//Creates a lead link list item
function leadsLink(item, value){

 //debugger;
 return '<li id="'+ value.key+'"><a href="javascript:void(0)'+ '" onclick="goToLeadDetailPage(\''+ item.name[1] + '\',\''+ item.email[1] + '\',\''+ value.key +  '\',\''+ item.phone[1] +'\')">'+ item.name[1]
            + '</a></li>';
};

//Dnyamic Page
function goToLeadDetailPage(itemName, itemEmail, valueKey, itemPhone){

        //create the page html template
        var leadPage = $("<div data-role='page' id='"+ valueKey +"'><div data-role='header'><a data-iconpos='left' data-icon='back' href='#home' data-role='button' data-ajax='false'>Back</a><h1>" + itemName + "</h1></div><div data-role='content' align='center'>"
                    + '<h2>' + itemName + '</h2>'
                    + '<h3>' + itemPhone + '</h3>'
                    + '<h3>' + itemEmail + '</h3>'
                    + '<a href="#" data-role="button" data-inline="true" data-rel="back" data-theme="c" id="ed">Edit</a>'
                    + '<a href="#" data-role="button" data-inline="true" data-rel="back" data-theme="c" id="del">Delete</a>'
                    + '<a href="#popupMenu" data-rel="popup" data-role="button" data-inline="true" data-transition="slideup" data-icon="bars" data-theme="b">' + "Contact " + itemName + " By..."
                    + '</a>'
                    + '<div data-role="popup" id="popupMenu" data-theme="a">'
                    + '<ul data-role="listview" data-inset="true" style="min-width:210px;" data-theme="d">'
                    + '<li data-role="divider" data-theme="b"></li>'
                    +   '<li><a href="tel:' + itemPhone + '">Phone</a></li>'
                    +   '<li><a href="smsto:' + itemPhone + '">Text</a></li>'
                    +   '<li><a href="mailto:' + itemEmail + '?Subject=Hello!">Email</a></li></ul>'
                    + '<a href="#" data-role="button" data-inline="true" data-rel="back" data-theme="c">Cancel</a>'
                    + '</div></div></div>');

        //append the new page to the page container
        leadPage.appendTo( $.mobile.pageContainer);

        //go to the newly created page
        $.mobile.changePage(leadPage);
        //return false

};

$('body').on('click', '#del', function(data){

    console.log('clicked delete button');

    var ask = confirm("Really? Are You Sure You Want to Delete this Lead?");
    var id = $(this).data('id');
    var rev = $(this).data('rev');
    var doc = {
        _id: id,
        _rev: rev
    };

    console.log(id);
    console.log(rev);
    console.log(doc);

    //if (ask) {

        console.log('Inside If');


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

    //}else{
        //alert("Your Lead was not Deleted");
    //}

});

