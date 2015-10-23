//Check if a Resource PI Required
function onChange(control, oldValue, newValue, isLoading) {
   if (isLoading) {
      return;
   }

var selectedResources = g_form.getValue('u_resource_requested');
	var checkPIStatus = checkPIRequired(selectedResources);
	if (checkPIStatus == 'true') {
		g_form.hideFieldMsg('u_resource_requested', checkPIStatus);			
		g_form.showFieldMsg('u_resource_requested', checkPIStatus);
		g_form.setMandatory('u_principal_investigator', true);   
		g_form.setDisplay('u_principal_investigator', true);
	}
	
	else {
		g_form.hideFieldMsg('u_resource_requested', checkPIStatus);
		g_form.showFieldMsg('u_resource_requested', checkPIStatus);
		g_form.setMandatory('u_principal_investigator', false);   
		g_form.setDisplay('u_principal_investigator', false);
	}

    function checkPIRequired(selectedResources) {  
		var ajaxPIRequired = new GlideAjax('GRASelectedResources');  
        ajaxPIRequired.addParam('sysparm_name', 'PIRequired');  
        ajaxPIRequired.addParam('sysparm_selectedResources', selectedResources);  
        ajaxPIRequired.getXMLWait();
		return ajaxPIRequired.getAnswer();  
		}
/* Client script only version below works but slower
var selectedResources = g_form.getValue('u_resource_requested').toString().split(',');

  for(var i=0; i<selectedResources.length; i++){
  //For each individual element in the array query resource table
  var resName = new GlideRecord('u_group_access_resource');
  //Query SysID to return each resource selected by user
  resName.addQuery('sys_id', selectedResources[i]);
  //Check if PI is required on each resource
  resName.addQuery('u_pi_required', true);
  resName.query();
  //Iterate users in Group Resource Approver List where active is false
  if (resName.hasNext()){
    //Push each user sysids to an array
    g_form.setMandatory('u_principal_investigator', true);   
    g_form.setDisplay('u_principal_investigator', true);
  }
  else if (!resName.hasNext()){
    //Push each user sysids to an array
    g_form.setMandatory('u_principal_investigator', false);   
    g_form.setDisplay('u_principal_investigator', false);
  }  
  }
   */
}