//Business Rule Loaner Res Item Availability
//When on Insert Update
function onBefore(current, previous){

gs.info("Previous end date " + previous.x_broi2_loaner_res_end_date + "Current end date" + current.x_broi2_loaner_res_end_date + " " );

	//Get previous End Date from server
var prevEndDate = previous.x_broi2_loaner_res_end_date;
	//Set previous end date to object
var prevEndDateP1 = new GlideDate(); 
prevEndDateP1.setValue(prevEndDate);
	//Add one day to previous date
prevEndDateP1.addDaysLocalTime(1);


//gs.info("Previous plus one " + pp1);
	
	var currentEndDate = current.x_broi2_loaner_res_end_date;
	
	gs.info("Previous end date plus one day: " + prevEndDateP1.getDisplayValue() + "Current end date: " + current.x_broi2_loaner_res_end_date);
	
	var lu = new LoanerResUtils();
	lu.isAvailable();
	
if (!lu.isAvailable(current.cmdb_ci, prevEndDateP1, currentEndDate)) {
//  gs.addErrorMessage(gs.getMessage('loaner_item_not_available'));
	gs.addErrorMessage("Sorry, the item is no longer available for the dates you selected. Please select new dates, or submit a new request for another inventory item.");
  current.setAbortAction(true);

}
}