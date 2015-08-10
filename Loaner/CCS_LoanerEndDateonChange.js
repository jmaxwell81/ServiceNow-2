//Catalog Client Script
//Loaner End Date onChange
//Type onChange Variable name end_date

function onChange(control, oldValue, newValue, isLoading) {
if (!isLoading) {
    g_form.hideErrorBox('end_date');
	//Remove computer selection if dates change
	var computer = g_form.getValue('cmdb_ci');
	if (computer != '') {
		g_form.setValue('cmdb_ci', '', '');
		}
	
	var start = g_form.getValue('start_date');
	var end = g_form.getValue('end_date');
	
	var checkEndFormat = checkDateFormat(end);
		if (checkEndFormat != 'true') {
			g_form.showFieldMsg('end_date', checkEndFormat,'error');
			g_form.submitted = false;  
       	 return false;  
			}
	
	var checkEndFuture = checkDateFuture(end);
		if (checkEndFuture != 'true') {
			g_form.showFieldMsg('end_date', checkEndFuture,'error');
			g_form.submitted = false;  
       	 return false;  
			}
	
	if (start != '' && end != '') {
	var checkStartEndCompare = checkDateCompare(start, end);
		if (checkStartEndCompare != 'true') {
			g_form.showFieldMsg('end_date', checkStartEndCompare ,'error');
			g_form.submitted = false;  
       	 return false;  
			}
	}
	if (start != '' && end != '') {
	var checkStartEndDiff = checkDateDiff(start, end);
		if (checkStartEndDiff != 'true') {
			g_form.showFieldMsg('start_date', checkStartEndDiff ,'error');
			g_form.showFieldMsg('end_date', checkStartEndDiff ,'error');
			g_form.submitted = false;  
       	 return false;  
			}
	}	
	}

	//Check calendar date format valid YYYY-MM-DD	
    function checkDateFormat(dateVal) {  
        var ajaxCalendarDate = new GlideAjax('ClientDateTimeUtils');  
        ajaxCalendarDate.addParam('sysparm_name', 'validateCalendarDate');  
        ajaxCalendarDate.addParam('sysparm_userDate', dateVal);  
        ajaxCalendarDate.getXMLWait();
		return ajaxCalendarDate.getAnswer();  
		}
	
	function checkDateFuture(dateVal) {
	//Check selected dates are in the future
		var ajaxFuture = new GlideAjax('ClientDateTimeUtils'); 
		ajaxFuture.addParam('sysparm_name', 'compareFutureDates');
		ajaxFuture.addParam('sysparm_userDate', dateVal); 
		ajaxFuture.getXMLWait();
		return ajaxFuture.getAnswer(); 
	}
	
	
	function checkDateFuture(dateVal) {
	//Check selected dates are in the future
		var ajaxFuture = new GlideAjax('ClientDateTimeUtils'); 
		ajaxFuture.addParam('sysparm_name', 'compareFutureDates');
		ajaxFuture.addParam('sysparm_userDate', dateVal); 
		ajaxFuture.getXMLWait();
		return ajaxFuture.getAnswer(); 
	}
	
	//Check start date is before end date
	function checkDateCompare(startval, endval) {
		var ajaxCompare = new GlideAjax('ClientDateTimeUtils'); 
		ajaxCompare.addParam('sysparm_name', 'compareStartEndDates');
		ajaxCompare.addParam('sysparm_start', startval); 
		ajaxCompare.addParam('sysparm_end', endval);
		ajaxCompare.getXMLWait();
		return ajaxCompare.getAnswer(); 
	}

	//Check loaner date period is not more than 21 days
	function checkDateDiff(startval, endval) {
		var ajaxCompare = new GlideAjax('ClientDateTimeUtils'); 
		ajaxCompare.addParam('sysparm_name', 'getDateDiff');
		ajaxCompare.addParam('sysparm_start', startval); 
		ajaxCompare.addParam('sysparm_end', endval);
		ajaxCompare.getXMLWait();
		return ajaxCompare.getAnswer(); 
}
}