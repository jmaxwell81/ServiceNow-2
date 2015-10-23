//Record Producer
//Stop submission of record producer create multiple records
current.setAbortAction(true);
if (producer.u_resource_requested != ''){
createGraReqs();
}
if (producer.u_group_name_by_user != ''){
createGraReqbyUser();
}

function createGraReqs() {
// try {    
   var graReq = '';
//Get user input list of requested resources
var graReqList = producer.u_resource_requested.toString().split(',');
   //Iterate the comma separate list and grab each resource requested by user
   for(i=0; i < graReqList.length; i++) {
   var resource = graReqList[i];
   //Insert new record into Group Access Request
   var graReq = new GlideRecord('u_group_access_request');  
   graReq.initialize();
   //Populate the Resource Requested field with one requested resource from the list
   graReq.u_requested_for_user = producer.u_requested_for_user;
   graReq.u_resource_requested = resource; 
   graReq.approval = 'not requested';
   graReq.u_additional_members = producer.u_additional_members;
   graReq.u_purpose = producer.u_purpose;
   if (producer.u_urgent == 'true'){
   graReq.u_urgent = producer.u_urgent;
   graReq.u_reason_for_urgency = producer.u_reason_for_urgency;
   graReq.urgency = 1;        
      }
   else if (producer.u_urgent == 'false'){
   graReq.u_urgent = 'false';
   }
      if (producer.u_principal_investigator != ''){
   graReq.u_principal_investigator = producer.u_principal_investigator;       
      }
   graReq.setDisplayValue('assignment_group','Core Services'); 
   graReq.short_description = "Group Access Request for user " + producer.u_requested_for_user.name;
   graReq.insert();
}
}

function createGraReqbyUser(){
      var gra = new GlideRecord('u_group_access_request');  
   gra.initialize();
   //Populate the Resource Requested field with one requested resource from the list
   gra.u_requested_for_user = producer.u_requested_for_user;
   gra.u_additional_members = producer.u_additional_members;
   gra.approval = 'not requested';
   gra.u_group_name_by_user = producer.u_group_name_by_user;
   gra.u_purpose = producer.u_purpose;
   if (producer.u_urgent == 'true'){
   gra.u_urgent = producer.u_urgent;
   gra.u_reason_for_urgency = producer.u_reason_for_urgency;
   gra.urgency = 1;        
      }
   else if (producer.u_urgent == 'false'){
   gra.u_urgent = 'false';
   }
   gra.setDisplayValue('assignment_group','Core Services');   
   gra.short_description = "Group Access Request for user " + producer.u_requested_for_user.name;
   gra.insert();
}
//Redirect to ITSS My Requests portal page
producer.redirect = "/itss/thankyou_groupaccess_request.do";