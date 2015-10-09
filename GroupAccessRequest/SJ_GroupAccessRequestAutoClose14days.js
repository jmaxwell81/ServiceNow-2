approvalAutoclose();
function approvalAutoclose() {
var nowDay = new Date();
var todayDay = nowDay.getDay();
	
//Run on weekdays only
if (todayDay != 0 && todayDay != 6) { 
	var aac = new GlideRecord('sysapproval_approver');  
	aac.addQuery('state', 'requested');
	aac.addQuery('sys_updated_on', '<', gs.daysAgoStart(14));
	aac.addQuery('sysapproval.sys_class_name','u_group_access_request');
	aac.query();
	while(aac.next()){ 
	//Get Group Access Request record that is associated with the approval record
	var graac = new GlideRecord('u_group_access_request');
	graac.addQuery('sys_id', aac.sysapproval);
	graac.query();
		if (graac.next()) {
			graac.state = '7';
			graac.approval = 'cancelled';
			graac.u_approval_expiration = 'true';
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