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
	
	var nowDateNum = nowDate.getNumericValue();
	var endDateNum = endDate.getNumericValue();
	gs.info("end date num" + endDateNum + " now date " + nowDateNum);
	
	var msDiff = nowDateNum - endDateNum;
	//Milliseconds divided by 86400 to get number of days as a decimal number
	var daysDiff = msDiff/86400000;
	//Convert number of days to string
	var daysDiffStr = daysDiff.toString();
	//Convert to an integer since this is a decimal number
	var daysDiffInt = parseInt(daysDiffStr);
	
	gs.info("msDiff " + msDiff + "daysDiff " + daysDiffInt);
		
	if (daysDiffInt >= 1) {
	gs.eventQueue('x_broi2_loaner_res.overduereminder', lnr, lnr.x_broi2_loaner_res_reserved_for.sys_id, daysDiffInt);
	}
	}
}