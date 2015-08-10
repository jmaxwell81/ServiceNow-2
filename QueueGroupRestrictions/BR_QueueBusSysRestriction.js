//Business Rule
//Queue BusSys Restriction
//Table Incident
//When Before Query
//Order 110
//Condition !gs.hasRole('admin') && gs.getSession().isInteractive() && !gs.getUser().isMemberOf('Service Desk') && !gs.getUser().isMemberOf('Information Security') && !gs.getUser().isMemberOf('Business Systems')

function onBefore(current, previous) {
queueBusSysRestrict();
}

function queueBusSysRestrict(){   
   //Restrict incident query allow access to BusSys records only if user is the caller or on watchlist or a member of specific group listed in condition (ServiceDesk, Business Systems, Information Security)
   var u = gs.getUserID(); //Get the sys_id value of the current user
	gs.log(u);
   var g = getMyGroups().getDisplayValue(); //Get the list of the current user groups
	gs.log(g);
   var q = current.addQuery('assignment_group.name', 'DOES NOT CONTAIN', 'Business Systems').addOrCondition('watch_list','CONTAINS',u); //Modify the current query on the incident table
}