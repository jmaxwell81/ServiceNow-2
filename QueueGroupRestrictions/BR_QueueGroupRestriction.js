//Business Rule
//Queue Group Restriction
//Table Incident
//When Before Query
//Order 100
//Condition !gs.hasRole('admin') && !gs.getUser().isMemberOf('Service Desk') && gs.getSession().isInteractive() && (gs.getUser().isMemberOf('Business Systems') || gs.getUser().isMemberOf('Events'))

queueRestrict();
function queueRestrict(){   
   //Restrict incident query allow access to records only if user is the caller or on watchlist or a member of assigned group
   var u = gs.getUserID(); //Get the sys_id value of the current user
	gs.log(u);
   var g = getMyGroups(); //Get the list of the current user groups
	gs.log(g);
   var q = current.addQuery('caller_id', u).addOrCondition('assignment_group', getMyGroups()).addOrCondition('watch_list','CONTAINS',u); //Modify the current query on the incident table
}