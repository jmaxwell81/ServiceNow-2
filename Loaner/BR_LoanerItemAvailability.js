//Business Rule
//Loaner Item Availability
//When Before Insert Update
//Order 100
//Condition Start Date or End Date or Computer Information changes

var lu = new LoanerUtils();
/* Note: in order to enable extending dates by changing the end date, we need to check if the CI is available starting on the previous end date (plus one) up to the new end date. The loaner request CI isn't going to be available from the period of start_date ---> new end_date because it's already reserved for part of that period (start_date ---> original end_date). */
gs.log("Previous end date " + previous.end_date + "Current end date" + current.end_date + " " );

var prevPlus1 = previous.end_date.getGlideObject();  
	prevPlus1.addDays(1);
var pp1 = prevPlus1.getDisplayValue();

gs.log("Previous plus one " + pp1);
	
if (!lu.isAvailable(current.cmdb_ci, pp1, current.end_date)) {
//  gs.addErrorMessage(gs.getMessage('loaner_item_not_available'));
	gs.addErrorMessage("Sorry, the item is no longer available for the dates you selected. Please select new dates, or submit a new request for another inventory item.");
  current.setAbortAction(true);
}