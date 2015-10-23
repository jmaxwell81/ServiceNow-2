//Check selected resources if Principal Investigator Required true

var GRASelectedResources = Class.create();
GRASelectedResources.prototype = Object.extendsObject(AbstractAjaxProcessor, {
  PIRequired: function(){
  var selectedResources = this.getParameter('sysparm_selectedResources');
  var selectedResourcesArr = selectedResources.toString().split(',');
    for(var i=0; i<selectedResourcesArr.length; i++){
    //For each individual element in the array query resource table
    var resName = new GlideRecord('u_group_access_resource');
    //Query SysID to return each resource selected by user
    resName.addQuery('sys_id', selectedResourcesArr[i]);
    //Check if PI is required on each resource
    resName.addQuery('u_pi_required', true);
    resName.query();
    //Iterate users in Group Resource Approver List where PI required true
    if (resName.hasNext()){
      var answer = 'true';
    }
    }
    return answer;
    },
    type: 'GRASelectedResources'
});