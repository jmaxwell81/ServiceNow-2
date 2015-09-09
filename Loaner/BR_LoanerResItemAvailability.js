//Business Rule Loaner Res Item Availability
//When on Insert Update
function onBefore(current, previous){
	//Get previous End Date from server
var prevEndDate = previous.x_broi2_loaner_res_end_date;
	//Set previous end date to object
var prevEndDateP1 = new GlideDate(); 
prevEndDateP1.setValue(prevEndDate);
	//Add one day to previous date
prevEndDateP1.addDaysLocalTime(1);

	var currentEndDate = current.x_broi2_loaner_res_end_date;
	
	var lu = new LoanerResUtils();
	var luAns = lu.isAvailable(current.cmdb_ci, prevEndDateP1, currentEndDate);
	if (!luAns){
	gs.addErrorMessage("Sorry, the item is not available for the new dates you selected. Please select another end date or submit a new request for another inventory item.");
	current.setAbortAction(true);
	}
}