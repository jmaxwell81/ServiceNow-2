approvalReminder();
function approvalReminder() {
var nowDay = new Date();
var todayDay = nowDay.getDay();
	gs.info("gra req reminder: " + todayDay);
//Run on weekdays only
if (todayDay != 0 && todayDay != 6) {
	var ar = new GlideRecord('sysapproval_approver');
	//Approval State Requested
	ar.addQuery('state', 'requested');
	//Approval For Task type is Group Access Request
	ar.addQuery('sysapproval.sys_class_name', 'u_group_access_request');	
	//Urgency is not high
	ar.addQuery('sysapproval.urgency', '!=', '1');
	//Updated between 2 and 3 days ago
	var bwn2n3days = 'sys_updated_onBETWEENjavascript:gs.daysAgoStart(3)@javascript:gs.daysAgoEnd(2)';
	//Updated between 5 and 6 days ago
	var bwn5n6days = '^ORsys_updated_onBETWEENjavascript:gs.daysAgoStart(6)@javascript:gs.daysAgoEnd(5)';
	//Updated between 8 and 9 days ago
	var bwn8n9days = '^ORsys_updated_onBETWEENjavascript:gs.daysAgoStart(9)@javascript:gs.daysAgoEnd(8)';
	//Updated between 11 and 12 days ago	
	var bwn11n12days = '^ORsys_updated_onBETWEENjavascript:gs.daysAgoStart(12)@javascript:gs.daysAgoEnd(11)';
	ar.addEncodedQuery(bwn2n3days + bwn5n6days + bwn8n9days + bwn11n12days);	
	ar.query();
	while(ar.next()){
	  gs.eventQueue("approval.groupaccess.reminder", ar, ar.approver, ar.sysapproval);  
	}
}
}