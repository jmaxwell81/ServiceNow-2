//Business Rule Loaner Overdue Count
//Table Loaner Request
//Order 100
//When to run async only
//Scheduled job fcScriptName=Loaner Overdue Count

loanerOverdueCount();

function loanerOverdueCount(){
	
//Get now date time in Milliseconds
var gdt = new GlideDateTime(); // Without input sets it to current UTC.  
var timeZoneOffSet = gdt.getTZOffset();  
var nowMs = gdt.getNumericValue();

var lnr = new GlideRecord('loaner_request'); 
	//Loaner requests that have state set to Checked Out
	lnr.addQuery('state', '=', 17);
	lnr.query();
var count = lnr.getRowCount();
	if (count > 0)
	while (lnr.next()) {	
	var end = lnr.end_date.getGlideObject().getNumericValue();
		//Loaner requests that have end date set to before today
		if (end < nowMs) {
		gs.log("Date " + end + "Number " + lnr.number);
		gs.eventQueue('loaner.overduereminder', lnr, lnr.requested_for.sys_id, lnr.requested_for.user_name);
			gs.log(lnr + lnr.requested_for.sys_id + lnr.requested_for.user_name);
		}
   }
}