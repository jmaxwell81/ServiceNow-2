//Workflow Activity If Requester is Approver
answer = ifRequesterisApprover()
	function ifRequesterisApprover(){
	var requestedForUser = current.x_broi2_group_acce_requested_for_user;
	var resourceRequested = current.x_broi2_group_acce_resource_requested;
	workflow.info(">>>requestedForUser " + requestedForUser + "resourceRequested " + resourceRequested);
	var grApp = new GlideRecord('x_broi2_group_acce_group_access_resource');
	grApp.addQuery('sys_id', resourceRequested);
	grApp.addQuery('x_broi2_group_acce_approver_list', 'CONTAINS', requestedForUser);
	grApp.query();
	if(grApp.hasNext()){
		return 'yes';
		}
	else {
		return 'no'
		}
}
