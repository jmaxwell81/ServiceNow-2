//Catalog Client Script
//Loaner End Date onSubmit
//Type onSubmit Variable set Loaner Management

function onSubmit() {
	var start = g_form.getValue('start_date');
	var end = g_form.getValue('end_date');
	var isValid = checkLoanerReq();
	if (isValid == false) {
		g_form.submitted = false;
		return false;
	}

function checkLoanerReq() {
	g_form.hideAllFieldMsgs('error');
	
	var start = g_form.getValue('start_date');
	var end = g_form.getValue('end_date');
	var special_instructions = g_form.getValue('u_special_instructions');
	
	var checkStartFormat = checkDateFormat(start);
		if (checkStartFormat != 'true') {
			g_form.showFieldMsg('start_date', checkStartFormat,'error');
       	 return false;  
			}
	
	var checkEndFormat = checkDateFormat(end);
		if (checkEndFormat != 'true') {
			g_form.showFieldMsg('end_date', checkEndFormat,'error');
       	 return false;  
			}
	
	var checkStartFuture = checkDateFuture(start);
		if (checkStartFuture != 'true') {
			g_form.showFieldMsg('start_date', checkStartFuture,'error');
       	 return false;  
			}
	
	var checkEndFuture = checkDateFuture(end);
		if (checkEndFuture != 'true') {
			g_form.showFieldMsg('end_date', checkEndFuture,'error'); 
       	 return false;  
			}
	
	if (start != '' && end != '') {
	var checkStartEndCompare = checkDateCompare(start, end);
		if (checkStartEndCompare != 'true') {
			g_form.showFieldMsg('start_date', checkStartEndCompare ,'error');
			g_form.showFieldMsg('end_date', checkStartEndCompare ,'error'); 
       	 return false;  
			}
	}
	if (start != '' && end != '') {
	var checkStartEndDiff = checkDateDiff(start, end);
		if (checkStartEndDiff != 'true') {
			g_form.showFieldMsg('start_date', checkStartEndDiff ,'error');
			g_form.showFieldMsg('end_date', checkStartEndDiff ,'error');
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