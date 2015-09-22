//Workflow Activity If Requester is Approver
answer = ifRequesterisApprover()
	function ifRequesterisApprover(){
	var requestedForUser = current.u_requested_for_user;
	var resourceRequested = current.u_resource_requested;
	workflow.info(">>>requestedForUser " + requestedForUser + "resourceRequested " + resourceRequested);
	var grApp = new GlideRecord('u_group_access_resource');
	grApp.addQuery('sys_id', resourceRequested);
	grApp.addQuery('u_approver_list', 'CONTAINS', requestedForUser);
	grApp.query();
	if(grApp.hasNext()){
		return 'yes';
		}
	else {
		return 'no'
		}
}

