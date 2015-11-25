//Scheduled Script Execution Job
//Loaner Overdue Reminder
//Time daily

loanerOverdueCount();

function loanerOverdueCount(){
	
//Get now date time
var gdt = new GlideDateTime(); // Without input sets it to current UTC.  
var timeZoneOffSet = gdt.getTZOffset();  

var lnr = new GlideRecord('loaner_request'); 
	//Loaner requests that have state set to Checked Out
	lnr.addQuery('state', '=', 17);
	lnr.query();
var count = lnr.getRowCount();
	if (count > 0)
	while (lnr.next()) {	
		//Get current end date as an object
		var end = lnr.end_date.getGlideObject();
		//Get difference between end date and now date in seconds
		var secondsDiff = gs.dateDiff(gdt.getDisplayValue(), end.getDisplayValue(), true);
	//If seconds difference is negative it is past the due date
	if (secondsDiff <= 0) {
		//Seconds divided by 86400 to get number of days as a negative decimal number
		var daysDiff = secondsDiff/86400;
		//Convert number of seconds to string
		var daysDiffStr = daysDiff.toString();
		//Convert to absolute value since this is a negative number
		var daysDiffAbs = Math.abs(daysDiffStr);
		//Convert to an integer since this is a decimal number
		var daysDiffInt = parseInt(daysDiffAbs);
		//Trigger the loaner overdue reminder event in the queue
		gs.eventQueue('loaner.overduereminder', lnr, lnr.requested_for.sys_id, daysDiffInt);
		}
	}
}