//Business Rule
//Loaner Reservation validation
//Table Loaner Reservation
//Order 100
//When Before Insert

function onBefore(current, previous) {
checkLoanerReservation();
function checkLoanerReservation() {
		
	var start = current.x_broi2_loaner_res_start_date;
	var end = current.x_broi2_loaner_res_end_date;
	
	//Create a GlideDateTime object	
	var gdtStart = new GlideDate();
		gdtStart.setValue(start);
	//Set gtd object to date selected by client	
	var gdtEnd = new GlideDate();
		gdtEnd.setValue(end);
	
		var checkStartDateFormat = isValidDate(start);
		if (checkStartDateFormat == false) {
		gs.addInfoMessage('ERROR: The start date is in an invalid format. Please use the calendar picker');
		stopSubmit();
		}
	
		var checkEndDateFormat = isValidDate(end);
		if (checkEndDateFormat == false) {
		gs.addInfoMessage('ERROR: The end date is in an invalid format. Please use the calendar picker');
		stopSubmit();
		}
	
		var checkStartDateFuture = isFutureDate(start);
		if (checkStartDateFuture == false) {
		gs.addInfoMessage('Selected dates must be in the future.');
		stopSubmit();
		}
	
		var checkEndDateFuture = isFutureDate(end);
		if (checkEndDateFuture == false) {
		gs.addInfoMessage('Selected dates must be in the future.');
		stopSubmit();
		}
		
		var compareStartEnd = compareDates(gdtStart, gdtEnd);
		if (compareStartEnd == false) {
		gs.addInfoMessage('Start date must be before end date.');
		stopSubmit();
		}

/*		var compareDaysBetween = getDaysBetween(start, end);
		if (compareDaysBetween == false) {
		gs.addInfoMessage('The maximum loan period is 21 days. Please select a shorter duration.');
		stopSubmit();
		}
		
		var checkStartDayofWk = getDayofWk(start);
		if (checkStartDayofWk == false) {
		gs.addInfoMessage('Selected dates must be on a weekday.');
		stopSubmit();
		}
	
		var checkEndDayofWk = getDayofWk(end);
		if (checkEndDayofWk == false) {
		gs.addInfoMessage('Selected dates must be on a weekday.');
		stopSubmit();
		}
		*/
	} 
}

//Date functions
		function isValidDate(dateVal) {
		//var userDateFormat = gd.getDateByFormat(dateVal, g_user_date_format);
		var userDate = dateVal;
		//Check date format will match one of the available system dates
		var ymdDash = /^\d{4}[\-](0?[1-9]|1[012])[\-](0?[1-9]|[12][0-9]|3[01])$/; //yyyy-mm-dd
		var mdyDash = /^(0[1-9]|1[0-2])[\-](0[1-9]|1\d|2\d|3[01])[\-](19|20)\d{2}$/; //mm-dd-yyyy
		var dmySlash = /^(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/; //dd/mm/yyyy
		var dmyDash = /^(0[1-9]|1\d|2\d|3[01])[\-](0[1-9]|1[0-2])[\-](19|20)\d{2}$/; //dd-mm-yyyy
		var dmyDot = /^(0[1-9]|1\d|2\d|3[01])[\.](0[1-9]|1[0-2])[\.](19|20)\d{2}$/; //dd.mm.yyyy
	
		if (!ymdDash.test(userDate) && !mdyDash.test(userDate) && !dmySlash.test(userDate) && !dmyDash.test(userDate) && !dmyDot.test(userDate)) {
			return false;
		}
		}
	
		function isFutureDate(dateVal) {
		
		var nowDate = new GlideDate();
			if (dateVal < nowDate) {
				return false;
		}
		}
		function compareDates(start, end) {
		//If start more than end start is later date		
		if(start > end) {
			return false;	
			}
		else if(start <= end) {
			return true;	
		}
		}
		
		function getDaysBetween(start, end) {
		var startDateValue = getDateFromFormat(start, g_user_date_format);
		var endDateValue = getDateFromFormat(end, g_user_date_format);
			var dateDiffMS = endDateValue - startDateValue;
			var dateDiffSecs = dateDiffMS / 1000;
			var dateDiffMins = dateDiffSecs / 60;
			var dateDiffHrs = dateDiffMins / 60;
			var dateDiffDays = dateDiffHrs / 24;
			if (dateDiffDays > 21) {
				return false;				
			}
		}
	
		function getDayofWk(dateVal) {
		var userDate = new GlideDate(dateVal);
		// Correct time zone by default GMT -4
		userDate.setHours(userDate.getHours() + 4);
		var day = userDate.getDay(); 
			gs.info("day of week: " + day);
			if (day == 6 || day == 0) {
				return false;			
			}
		}

		function stopSubmit() {
		gs.addErrorMessage("Record submission aborted");
		current.setAbortAction(true);
		gs.setRedirect(current);
		}