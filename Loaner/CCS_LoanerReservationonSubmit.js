//CCS Loaner Reservation onSubmit
function onSubmit() {
		var isValid = checkLoanerReservation();
		if (isValid == false) {
			g_form.submitted = false;
			return false;
		}
}
function checkLoanerReservation() {
		g_form.hideAllFieldMsgs('error');
		
	var start = g_form.getValue('x_broi2_loaner_res_start_date');
	var end = g_form.getValue('x_broi2_loaner_res_end_date');

		var checkStartDateFormat = isValidDate(start);
		if (checkStartDateFormat == 0) {
		g_form.showFieldMsg('x_broi2_loaner_res_start_date', 'The start date is in an invalid format. Please use the calendar picker','error');
		return false;
		}
	
		var checkEndDateFormat = isValidDate(end);
		if (checkEndDateFormat == 0) {
		g_form.showFieldMsg('x_broi2_loaner_res_end_date', 'The end date is in an invalid format. Please use the calendar picker','error');
		return false;
		}
	
		var checkStartDateFuture = isFutureDate(start);
		if (checkStartDateFuture == false) {
		g_form.showFieldMsg('x_broi2_loaner_res_start_date', 'Selected dates must be in the future.','error');
		return false;
		}
	
		var checkEndDateFuture = isFutureDate(end);
		if (checkEndDateFuture == false) {
		g_form.showFieldMsg('x_broi2_loaner_res_end_date', 'Selected dates must be in the future.','error');
		return false;
		}
		
		var compareStartEnd = compareDates(start, end);
		if (compareStartEnd == false) {
		g_form.showFieldMsg('x_broi2_loaner_res_start_date', 'Start date must be before end date.','error');
		return false;
		}

		var compareDaysBetween = getDaysBetween(start, end);
		if (compareDaysBetween == false) {
		g_form.showFieldMsg('x_broi2_loaner_res_start_date', 'The maximum loan period is 21 days. Please select a shorter duration.','error');
		return false;
		}
		
		var checkStartDayofWk = getDayofWk(start);
		if (checkStartDayofWk == false) {
		g_form.showFieldMsg('x_broi2_loaner_res_start_date', 'Selected dates must be on a weekday.','error');
		return false;
		}
	
		var checkEndDayofWk = getDayofWk(end);
		if (checkEndDayofWk == false) {
		g_form.showFieldMsg('x_broi2_loaner_res_end_date', 'Selected dates must be on a weekday.','error');
		return false;
		}
	
}
	
//Date functions
		function isValidDate(dateVal) {
		var userDateFormat = getDateFromFormat(dateVal, g_user_date_format);
		return userDateFormat;
		}
	
		function isFutureDate(dateVal) {
		var userDateValue = getDateFromFormat(dateVal, g_user_date_format);
		var nowDate = new Date();
			if (userDateValue < nowDate) {
				return false;
		}
		}
		function compareDates(start, end) {
		var startDateValue = getDateFromFormat(start, g_user_date_format);
		var endDateValue = getDateFromFormat(end, g_user_date_format);
			if (startDateValue > endDateValue) {
				return false;
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
		var userDate = new Date(dateVal);
		// Correct time zone by default GMT -4
		userDate.setHours(userDate.getHours() + 4);
		var day = userDate.getDay(); 
			if (day == 6 || day == 0) {
				return false;			
			}
		}