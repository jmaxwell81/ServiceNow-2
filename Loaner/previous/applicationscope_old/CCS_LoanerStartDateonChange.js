//Catalog Client Script Loaner Start Date onChange
function onChange(control, oldValue, newValue, isLoading) {
	if (!isLoading) {
		
		g_form.hideErrorBox('x_broi2_loaner_res_start_date');
		
	var start = g_form.getValue('x_broi2_loaner_res_start_date');
	var end = g_form.getValue('x_broi2_loaner_res_end_date');

		var checkDateFormat = isValidDate(start);
		if (checkDateFormat == 0) {
		g_form.showFieldMsg('x_broi2_loaner_res_start_date', 'The date is an invalid format. Please use the calendar picker','error');
		}
		
		var checkDateFuture = isFutureDate(start);
		if (checkDateFuture == false) {
		g_form.showFieldMsg('x_broi2_loaner_res_start_date', 'Selected dates must be in the future.','error');
		}
		
		if (end != '') {
		var compareStartEnd = compareDates(start, end);
		if (compareStartEnd == false) {
		g_form.showFieldMsg('x_broi2_loaner_res_start_date', 'Start date must be before end date.','error');
		}
		
		var compareDaysBetween = getDaysBetween(start, end);
		if (compareDaysBetween == false) {
		g_form.showFieldMsg('x_broi2_loaner_res_start_date', 'The maximum loan period is 21 days. Please select a shorter duration.','error');
		}
		}
		
		getDayofWk(start);
		
		
/*		if (start != '' && end != '') {
	var checkStartEndDiff = checkDateDiff(start, end);
			alert("checkStartEndDiff " + checkStartEndDiff);
		if (checkStartEndDiff != 'true') {
			g_form.showFieldMsg('x_broi2_loaner_res_start_date', checkStartEndDiff ,'error');
			g_form.showFieldMsg('x_broi2_loaner_res_end_date', checkStartEndDiff ,'error');
       	 return false;
			}
	}
	*/
		

}
	
	
//Date functions
		function isValidDate(value) {
		var userDateFormat = getDateFromFormat(value, g_user_date_format);
		return userDateFormat;
		}
	
		function isFutureDate(value) {
		var userDateValue = getDateFromFormat(value, g_user_date_format);
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
	
		function getDayofWk(value) {
		var now = new Date(value); 
 		alert("start date val " + now);
		// Correct time zone, which is by default GMT -7 
		now.setHours (now.getHours() + 4);
		alert("start date val timezone" + now)			
		var day = now.getDay(); 
		alert("day of week" + day)		
			if (day >= 6) {
				alert("Selected dates must be on a weekday" + day)		
				return false;			
			}
		}	
	
	
}

/*	//Check loaner date period is not more than 21 days
	function checkDateDiff(startval, endval) {
		var ajaxCompare = new GlideAjax('LoanerClientDateTimeUtils'); 
		ajaxCompare.addParam('sysparm_name', 'getDateDiff');
		ajaxCompare.addParam('sysparm_start', startval); 
		ajaxCompare.addParam('sysparm_end', endval);
		ajaxCompare.getXML();
		return ajaxCompare.getAnswer(); 
		}
} */
	
/*		function localizeDateStr (date_to_convert_str) {
		var date_to_convert = new Date(date_to_convert_str);
		var local_date = new Date();
		date_to_convert.setHours(date_to_convert.getHours()+local_date.getTimezoneOffset​());
		return date_to_convert.toString(); }
		*/

		
/*	var userDate = g_form.getValue('x_broi2_loaner_res_start_date');
//Check date format will match one of the available system dates
	var ymdDash = /^\d{4}[\-](0?[1-9]|1[012])[\-](0?[1-9]|[12][0-9]|3[01])$/; //yyyy-mm-dd
	var mdyDash = /^(0[1-9]|1[0-2])[\-](0[1-9]|1\d|2\d|3[01])[\-](19|20)\d{2}$/; //mm-dd-yyyy
	var dmySlash = /^(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/; //dd/mm/yyyy
	var dmyDash = /^(0[1-9]|1\d|2\d|3[01])[\-](0[1-9]|1[0-2])[\-](19|20)\d{2}$/; //dd-mm-yyyy

//A bug with the builtin GlideDateTime object is preventing the use of the date in this format
//	var dmyDot = /^(0[1-9]|1\d|2\d|3[01])[\.](0[1-9]|1[0-2])[\.](19|20)\d{2}$/; //dd.mm.yyyy
	
if (!ymdDash.test(userDate) && !mdyDash.test(userDate) && !dmySlash.test(userDate) && !dmyDash.test(userDate)) {
	g_form.showFieldMsg('x_broi2_loaner_res_start_date',"ERROR: Format must be yyyy-mm-dd, mm-dd-yyyy, dd/mm/yyyy or dd-mm-yyyy.",'error');
	}
	else {
		return true;
	}
}
} */
	
/*

function checkDateFormat(value){
    if(value == '' || value == undefined || value == null){
        return false;
    }
    return (getDateFromFormat(value, g_user_date_format) != 0);
}
	
	var checkStartFormat = checkDateFormat(start);
//	if (checkStartFormat != true) {
	g_form.showFieldMsg('x_broi2_loaner_res_start_date', checkStartFormat,'error');
//	return false;
//	}	
	
} */
 
	
/*	var checkStartFormat = checkDateFormat(start);
		if (checkStartFormat != 'true') {
			g_form.showFieldMsg('x_broi2_loaner_res_start_date', checkStartFormat,'error');
       	 return false;  
			}

	var checkStartDaywk = checkDayOfWeek(start);
		if (checkStartDaywk != 'true') {
			g_form.showFieldMsg('x_broi2_loaner_res_start_date', checkStartDaywk,'error');
       	 return false;  
			}

	var checkStartFuture = checkDateFuture(start);
		if (checkStartFuture != 'true') {
			g_form.showFieldMsg('x_broi2_loaner_res_start_date', checkStartFuture,'error');
			return false;  
			}
	
	if (start != '' && end != '') {
	var checkStartEndCompare = checkDateCompare(start, end);
		if (checkStartEndCompare != 'true') {
			g_form.showFieldMsg('x_broi2_loaner_res_start_date', checkStartEndCompare ,'error');
       	 return false;  
			}
	}
	
	if (start != '' && end != '') {
	var checkStartEndDiff = checkDateDiff(start, end);
		if (checkStartEndDiff != 'true') {
			g_form.showFieldMsg('x_broi2_loaner_res_start_date', checkStartEndDiff ,'error');
			g_form.showFieldMsg('end_date', checkStartEndDiff ,'error');
       	 return false;
			}
	}

	//Check calendar date format valid	
    function checkDateFormat(dateVal) {  
        var ajaxCalendarDate = new GlideAjax('ClientDateTimeUtils');  
        ajaxCalendarDate.addParam('sysparm_name', 'validateCalendarDate');  
        ajaxCalendarDate.addParam('sysparm_userDate', dateVal);  
        ajaxCalendarDate.getXML();
		return ajaxCalendarDate.getAnswer();  
		}

	//Check day of week	
    function checkDayOfWeek(dateVal) {  
        var ajaxDayOfWeek = new GlideAjax('ClientDateTimeUtils');  
        ajaxDayOfWeek.addParam('sysparm_name', 'validateDayOfWeek');  
        ajaxDayOfWeek.addParam('sysparm_userDate', dateVal);  
        ajaxDayOfWeek.getXML();
		return ajaxDayOfWeek.getAnswer();  
		}
	
	function checkDateFuture(dateVal) {
	//Check selected dates are in the future
		var ajaxFuture = new GlideAjax('ClientDateTimeUtils'); 
		ajaxFuture.addParam('sysparm_name', 'compareFutureDates');
		ajaxFuture.addParam('sysparm_userDate', dateVal); 
		ajaxFuture.getXML();
		return ajaxFuture.getAnswer(); 
	}
	
	//Check start date is before end date
	function checkDateCompare(startval, endval) {
		var ajaxCompare = new GlideAjax('ClientDateTimeUtils'); 
		ajaxCompare.addParam('sysparm_name', 'compareStartEndDates');
		ajaxCompare.addParam('sysparm_start', startval); 
		ajaxCompare.addParam('sysparm_end', endval);
		ajaxCompare.getXML();
		return ajaxCompare.getAnswer(); 
	}

	//Check loaner date period is not more than 21 days
	function checkDateDiff(startval, endval) {
		var ajaxCompare = new GlideAjax('ClientDateTimeUtils'); 
		ajaxCompare.addParam('sysparm_name', 'getDateDiff');
		ajaxCompare.addParam('sysparm_start', startval); 
		ajaxCompare.addParam('sysparm_end', endval);
		ajaxCompare.getXML();
		return ajaxCompare.getAnswer(); 
		}
}
*/