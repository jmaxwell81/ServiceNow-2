approvalReminderUrgent();
function approvalReminderUrgent() {
var nowDay = new Date();
var todayDay = nowDay.getDay();
	
//Run on weekdays only
if (todayDay != 0 && todayDay != 6) { 
	var ar = new GlideRecord('sysapproval_approver');  
	ar.addQuery('state', 'requested');
	ar.addQuery('sysapproval.urgency', '1');  
	ar.addQuery('sys_updated_on', '<', gs.daysAgoStart(0));
	ar.addQuery('sysapproval.sys_class_name','u_group_access_request');
	ar.query();  
	while(ar.next()){  
	  gs.eventQueue("approval.groupaccess.reminder.urgent", ar, ar.approver, ar.approver.name);  
	}
}
}