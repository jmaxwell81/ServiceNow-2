//Record Producer
//Stop submission we are creating multiple records
current.setAbortAction(true);
if (producer.u_resource_requested != ''){
createGraReqs();
}
if (producer.u_group_name_by_user != ''){
createGraReqbyUser();
}

function createGraReqs() {
   var graReq = '';
//Get user input list of requested resources
var graReqList = producer.u_resource_requested.toString().split(',');
   //Iterate the comma separate list and grab each resource requested by user
   for(i=0; i < graReqList.length; i++) {
   resource = graReqList[i];
   //Insert new record into Group Access Request
   var graReq = new GlideRecord('u_group_access_request');  
   graReq.initialize();
   //Populate the Resource Requested field with one requested resource from the list
   graReq.u_requested_for_user = producer.u_requested_for_user;
   graReq.u_resource_requested = resource; 
   graReq.u_additional_members = producer.u_additional_members;
   graReq.u_purpose = producer.u_purpose;
   graReq.short_description = "Group Access Requested for user " + producer.u_requested_for_user.name;
   graReq.insert();
}
}

function createGraReqbyUser(){
      var gra = new GlideRecord('u_group_access_request');  
   gra.initialize();
   //Populate the Resource Requested field with one requested resource from the list
   gra.u_requested_for_user = producer.u_requested_for_user;
   gra.u_additional_members = producer.u_additional_members;
   gra.u_group_name_by_user = producer.u_group_name_by_user;
   gra.u_purpose = producer.u_purpose;
   gra.short_description = "Group Access Requested for user " + producer.u_requested_for_user.name;
   gra.insert();
}
//Redirect to ITSS My Requests portal page
//producer.redirect = "incident_list.do?sysparm_query=active=true^EQ&active=true";
//gs.setRedirect("/itss/thankyou_groupaccessrequest.do");