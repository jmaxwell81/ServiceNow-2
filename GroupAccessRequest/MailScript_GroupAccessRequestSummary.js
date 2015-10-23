//Summary of group access request for this approval
var approvalFor_id = current.sysapproval;
var graRequest = new GlideRecord('u_group_access_request');
  graRequest.addQuery('sys_id', approvalFor_id);
  graRequest.query();
  //Iterate each active Group Access Request with the approver
  while(graRequest.next()){
	  template.print("<b>Requested For User: </b>" + graRequest.u_requested_for_user.name + "<br/>");
	  template.print("<b>Opened By: </b>" + graRequest.opened_by.name + "<br/>");	  
	  template.print("<b>Resource Requested: </b>" + graRequest.u_resource_requested.u_resource_name + "<br/>");	  
	  template.print("<b>Request Number: </b>" + graRequest.number + "<br/>");
	  template.print("<b>Principal Investigator: </b>" + graRequest.u_principal_investigator + "<br/>");
	  template.print("<b>Purpose: </b>" + graRequest.u_purpose + "<br/>");
	  template.print("<b>Additional Members: </b>");
	  //Additional members list convert to an array
	  if (graRequest.u_additional_members != ''){
	  //HTML tags
	  template.print("<ul>");
	  //Get additional members list collector sysids
	  var additionalMembersList = graRequest.u_additional_members;
	  //Set list of comma separate values into an array
  	var addMembers = additionalMembersList.split(',');
	  //Iterate over array
		for(var i=0; i<addMembers.length; i++){
	  //For each item in the array query the user table and get the user name
  	var graUsr = new GlideRecord('sys_user');
  	graUsr.addQuery('sys_id', addMembers[i]);
 	 graUsr.query();
	  graUsr.next();
	  template.print("<li><b>"+graUsr.name+"</b></li>");
		}
	  template.print("</ul>");
  }
	  else if (graRequest.u_additional_members == ''){
		  template.print("No-one");
  }
}