//Business Rule Additonal Comments HTML
//Table Incident
//When Before Insert Update
//Order 100

function onBefore(current, previous) { 
	
//Additional Comments HTML custom field copy to Comments in HTML
	//Place code tags around comment
	var comment = current.u_additional_comments_html;
	//If comment is not blank
	if (comment != '') {
    var wrappedComment = "[code]" + comment + "[/code]";  
    comment = wrappedComment;  

	// Clunky workaround to inject style attribute into image tags.  
	var commentStyle = comment.replace(/\<img style\=\"/g, "\<img style\=\"display\: block\; ");   
	current.comments = commentStyle;
	//Remove content after copy is complete
	current.u_additional_comments_html = '';
	}
	
//Work Notes HMTL custom field copy to Work Notes in HTML
	var note = current.u_work_notes_html;
	//If work note is not blank
	if (note != '') {
    var wrappedNote = "[code]" + note + "[/code]";  
    note = wrappedNote;

	// Clunky workaround to inject style attribute into image tags.  
	var noteStyle = note.replace(/\<img style\=\"/g, "\<img style\=\"display\: block\; ");   
	current.work_notes = noteStyle;
	//Remove content after copy is complete
	current.u_work_notes_html = '';
	}
}