//Business Rule Quick Messages Query
//Table sys_email_canned_message
//When Before Query
//Order 100
//Condition !gs.hasRole('admin') && !gs.getUser().isMemberOf('Service Desk') && gs.getSession().isInteractive()

function onBefore(current, previous) {
quickMsgsRestrict();
function quickMsgsRestrict(){   
   //Restrict quick messages query allow access to records only if user a member of quick message group
   var u = gs.getUserID(); //Get the sys_id value of the current user
	gs.log(u);
   var g = getMyGroups(); //Get the list of the current user groups
	gs.log(g);
   var q = current.addQuery('group', getMyGroups()); //Modify the current query on the incident table
}
}