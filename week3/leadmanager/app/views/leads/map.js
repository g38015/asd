function(doc) {
 	if (doc._id.substr(0, 4) === "lead") {
 		emit(doc._id, {
 		"name": doc.name,
 		"email": doc.email,
 		"phone": doc.phone,
 		"date": doc.date
 		});
 	} 
};