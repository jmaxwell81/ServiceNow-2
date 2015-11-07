approvalAutoclose();
function approvalAutoclose() {
var nowDay = new Date();
var todayDay = nowDay.getDay();
	
//Run on weekdays only
if (todayDay != 0 && todayDay != 6) {
	var aac = new GlideRecord('sysapproval_approver');  
	aac.addQuery('state', 'requested');
	aac.addQuery('sysapproval.sys_class_name','u_group_access_request');
	aac.addQuery('sys_updated_on', '>', gs.daysAgoStart(14));
	aac.query();
	while(aac.next()){ 
	//Get Group Access Request record that is associated with the approval record
	var graac = new GlideRecord('u_group_access_request');
	graac.addQuery('sys_id', aac.sysapproval);
	graac.addQuery('u_approval_expired', 'false');
	graac.addQuery('approval', '!=', 'cancelled');
	graac.query();
		while(graac.next()) {
			if (graac.approval != 'cancelled') {
			graac.approval = 'cancelled';
			//Set approval expired
			graac.u_approval_expired = 'true';
			graac.u_group_access_state = '7';
			gs.log("Group Access Request" + graac.number + " is inactive has been closed automatically");
			graac.update();
		}
	//Set Approval to Not Required	
	aac.state = 'not_required';
	gs.log("Approval for Group Access Request" + aac.sysapproval.number + " is inactive and has been closed automatically");
	aac.update();
	}
}
}
}