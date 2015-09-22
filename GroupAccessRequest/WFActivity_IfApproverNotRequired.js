//Workflow Activity If Approver Not Required
answer = ifApproverNotRequired();
function ifApproverNotRequired() {
	var approverReqAns = current.u_resource_requested.u_approver_not_required;
workflow.info(">>>Approver not required: " + current.u_resource_requested.u_approver_not_required);	
	if (approverReqAns == true){
return 'yes';
	}
	return 'no';
}