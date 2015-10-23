//Scheduled Job
//url encoded query
// https://broaddev.service-now.com/sys_user_has_role_list.do?sysparm_query=GOTOrole.name%3Duser%5Euser.sourceISEMPTY&sysparm_first_row=1&sysparm_view=

getBroadGrMembers();
function getBroadGrMembers() {  
	//Return a list of users that have a source but are not members of broad institute group
var u = new GlideRecord('sys_user');  
//  grpMbr.addQuery('user', userID);  
//  grpMbr.addQuery('group', 'DOES NOT CONTAIN', groupID);
  u.addEncodedQuery('user.sourceSTARTSWITHldap^user.active=true');
  u.query();  
  while (u.next()) {
	  gs.info("Query Broad Institute Members User: " + u.name + "Broad Institute: " + gs.getUser(u).­isMemberOf(­'Broad Institute'));
  }
}
	  

	//User Role
var urole = new GlideRecord('sys_user');  
//  grpMbr.addQuery('user', userID);  
//  grpMbr.addQuery('group', 'DOES NOT CONTAIN', groupID);
//  u.addEncodedQuery('user.sourceSTARTSWITHldap^user.active=true');
	urole.addEncodedQuery('user.sourceISEMPTY^user.active=true');
  urole.query();  
  while (urole.next()) {
    var userRole = gs.getUser(urole).hasRole(­'user');
//	  gs.info("Query Broad Institute Members User: " + u.name + "Broad Institute: " + broadinst);	  
    var broadinst = gs.getUser(urole).­isMemberOf(­'Broad Institute');	  
//	  if (broadinst != true) {
	  gs.info("Query User Role: " + urole.email + " User Role: " + userRole);		  
//	  }
  }
}