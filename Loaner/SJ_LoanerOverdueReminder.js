//Scheduled Script Execution Job
//Loaner Overdue Reminder
//Time daily

loanerOverdueCount();

function loanerOverdueCount(){
	
//Get now date time
var nowDate = new GlideDate(); // Without input sets it to current UTC.  
var timeZoneOffSet = nowDate.getTZOffset();

var lnr = new GlideRecord('x_broi2_loaner_res_loaner_reservation'); 
	//Loaner requests that have state set to Checked Out
	lnr.addQuery('state', '=', 16);
	lnr.query();
var count = lnr.getRowCount();
	if (count > 0)
	while (lnr.next()) {	
	var userEndDate = lnr.x_broi2_loaner_res_end_date;
	var endDate = new GlideDate(); 
	endDate.setValue(userEndDate);

	//Get date value in milliseconds to compare
	var nowDateNum = nowDate.getNumericValue();
	var endDateNum = endDate.getNumericValue();
	
	var msDiff = nowDateNum - endDateNum;
	//Milliseconds divided by 86400 to get number of days as a decimal number
	var daysDiff = msDiff/86400000;
	//Convert number of days to string
	var daysDiffStr = daysDiff.toString();
	//Convert to an integer since this is a decimal number
	var daysDiffInt = parseInt(daysDiffStr);
	
	if (daysDiffInt >= 1) {
	//Trigger event to send overdue reminder to the user
	gs.eventQueue('x_broi2_loaner_res.overduereminder', lnr, lnr.x_broi2_loaner_res_reserved_for.sys_id, daysDiffInt);
	//If reservation not set as overdue already then set to overdue
		var overdueStatus = lnr.x_broi2_loaner_res_overdue;
		if (!overdueStatus) {
			lnr.x_broi2_loaner_res_overdue = true;
			lnr.update();
		}
	}
	}
}