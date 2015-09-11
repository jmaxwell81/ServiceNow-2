//Scheduled Script Execution Job
//Loaner Return Reminder
//Time daily

loanerReturnReminder();

function loanerReturnReminder(){
	
//Get now date time
var nowDate = new GlideDate(); // Without input sets it to current UTC.  
var timeZoneOffSet = nowDate.getTZOffset();

var lnr = new GlideRecord('x_broi2_loaner_res_loaner_reservation'); 
	//Loaner reservations that have state set to Checked Out
	lnr.addQuery('x_broi2_loaner_res_loaner_state', '=', 2);
	//Query loaner reservations with start date tomorrow
	var strQuery = 'x_broi2_loaner_res_end_dateONTomorrow@javascript:gs.daysAgoStart(-1)@javascript:gs.daysAgoEnd(-1)';
	lnr.addEncodedQuery(strQuery);
	
	lnr.query();
var count = lnr.getRowCount();
	if (count > 0)
	while (lnr.next()) {
	//Trigger event to send return reminder to the user
	gs.eventQueue('x_broi2_loaner_res.returnreminder', lnr, lnr.x_broi2_loaner_res_reserved_for.sys_id, lnr.number);
	}
	}