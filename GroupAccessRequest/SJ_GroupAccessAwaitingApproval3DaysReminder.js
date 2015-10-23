approvalReminder();
function approvalReminder() {
var nowDay = new Date();
var todayDay = nowDay.getDay();
	
//Run on weekdays only
if (todayDay != 0 && todayDay != 6) { 
	var ar = new GlideRecord('sysapproval_approver');  
	ar.addQuery('state', 'requested');
	ar.addQuery('urgent', 'false');  
//Updated between 2 and 3 days ago
	ar.addEncodedQuery('sys_updated_onBETWEENjavascript:gs.daysAgoStart(3)@javascript:gs.daysAgoEnd(2)');
//Updated between 5 and 6 days ago	
	ar.addEncodedQuery('^NQsys_updated_onBETWEENjavascript:gs.daysAgoStart(6)@javascript:gs.daysAgoEnd(5)');
//Updated between 8 and 9 days ago	
	ar.addEncodedQuery('^NQsys_updated_onBETWEENjavascript:gs.daysAgoStart(9)@javascript:gs.daysAgoEnd(8)');
//Updated between 11 and 12 days ago	
	ar.addEncodedQuery('^NQsys_updated_onBETWEENjavascript:gs.daysAgoStart(12)@javascript:gs.daysAgoEnd(11)');
	ar.addQuery('sysapproval.sys_class_name','u_group_access_request');
	ar.query();  
	while(ar.next()){  
	  gs.eventQueue("approval.groupaccess.reminder", ar, ar.approver, ar.sysapproval);  
	}
}
}