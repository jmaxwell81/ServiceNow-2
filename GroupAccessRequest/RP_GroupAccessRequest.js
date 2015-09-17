//Record Producer
current.setAbortAction(true);
createGraReqs();

function createGraReqs() {
var graReq = '';
//Get user input list of requested resources
var graReqList = producer.x_broi2_group_acce_resource_requested.toString().split(',');
	gs.info("Create gra reqs: " + graReqList);
for(i=0; i < graReqList.length; i++) {
   //Iterate the comma separate list and grab each resource requested by user
   resource = graReqList[i];
	gs.info("resource: " + resource);
   //Insert new record into Group Access Request
   var graReq = new GlideRecord('x_broi2_group_acce_group_access_req');  
   graReq.initialize();
   //Populate the Resource Requested field with one requested resource from the list
   graReq.x_broi2_group_acce_resource_requested = resource;
	gs.info(">>>Glide graReq: " + graReq.x_broi2_group_acce_resource_requested);
   graReq.short_description = 'Automatically generated group access request record ';
   graReq.insert();  
}
}