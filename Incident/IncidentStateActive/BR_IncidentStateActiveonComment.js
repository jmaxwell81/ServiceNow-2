//Business Rule Incident State Active on Comment
//Table Incident
//When Before Insert Update
//Order 1150
//Condition current.comments.changes() && (current.assignment_group.getDisplayValue() != 'Webmaster' && current.assignment_group.getDisplayValue() != 'Coeus' && current.assignment_group.getDisplayValue() != 'Business Systems')

if (current.caller_id.user_name != 'icinga') {
	//Same state if incident is resolved and updated by ITIL
	if ((current.incident_state == 6 || current.incident_state == 7) && gs.hasRole('itil')) {
		gs.log("Don't change status because " + current.number + " is resolved, updated by ITIL");
	//Reopen if current state is resolved															   
	} else if ((current.incident_state == 6) && (current.assignment_group.name != "Network" && current.assignment_group.name != "Information Security")) {
		gs.log(current.number + " - State changed to " + current.incident_state);
		current.incident_state = 2;
	//Reopen if current state is resolved and if group is Network or Information Security then also clear the assigned to user
	} else if ((current.incident_state == 6) && (current.assignment_group.name == "Network" || current.assignment_group.name == "Information Security")) {
		current.assigned_to = "";
		current.incident_state = 2;
		gs.log(current.number + " - Assigned to has been cleared ");
		gs.log(current.number + " - State changed to " + current.incident_state);
	} else if (current.incident_state == 7) {
	//Incident State is closed do not update state
		gs.log(current.number + " - Incident State closed do not update state " + current.incident_state);
	} else if((current.incident_state == 4 || current.incident_state == 5 || current.incident_state == 11 || current.incident_state == 8)&& gs.getUser().isMemberOf(current.assignment_group) == false) {
	//Incident State is awaiting user info or awaiting evidence or awaiting due date or awaiting stock and ticket has been updated by user who is not a member of assignment group update state
		current.incident_state = 2;
		gs.log(current.number + " - Incident State awaiting user info and user is not in assignment group update state " + current.incident_state);
	} else if(current.incident_state == 4 && gs.getUser().isMemberOf(current.assignment_group) == true) {
	//Incident State is awaiting user info and ticket has been updated by member of assignment group do not update state
		//current.incident_state = 2;
		gs.log(current.number + " - Incident State awaiting user info and user is in assignment group do not update state " + current.incident_state);
	} else if (current.incident_state != previous.incident_state) { 
		gs.log(current.number + " was " + previous.incident_state + " and changed to " + current.incident_state);
}
}