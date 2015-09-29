//Mail Script groupaccess_request_summary
var approvalFor_id = event.parm2;
var graRequest = new GlideRecord('u_group_access_request');
  graRequest.addQuery('sys_id', approvalFor_id);
  graRequest.query();
  //Iterate each active Group Access Request with the approver
  while(graRequest.next()){
	  template.print("<b>Resource Requested: </b>" + graRequest.u_resource_requested.u_resource_name + "<br/>");
	  template.print("<b>Requested For User: </b>" + graRequest.u_requested_for_user.name + "<br/>");
	  //Additional members list convert to an array
	  var additionalMembersList = graRequest.u_additional_members;
  	var addMembers = additionalMembersList.split(',');
	  var names = [];
		for(var i=0; i<addMembers.length; i++){
	  //For each item in the array query the user table and get the user name
  	var graUsr = new GlideRecord('sys_user');
  	graUsr.addQuery('sys_id', addMembers[i]);
 	 graUsr.query();
	  graUsr.next();
	  //Push values to array
	  names.push(graUsr.name + '');
		}
	  //If there is more than one name create a human readable sentence comma separate
	  if (names.length > 1){
	  var aue = new ArrayUtilExt();
	var namesList = aue.sentence(names);
			}
	  //If there is one name just return the same value
	  else if (names.length == 1) {
		  var namesList = names;
	  }
	  //If there are no names just print a string
	  else if (names.length < 1) {
		var namesList = "No-one";  
	  }
	  template.print("<b>Additional Members: </b>" + namesList + "<br/>");
	  template.print("<b>Purpose: </b>" + graRequest.u_purpose + "<br/>");
	  template.print("<b>Request Number: </b>" + graRequest.number);
  }