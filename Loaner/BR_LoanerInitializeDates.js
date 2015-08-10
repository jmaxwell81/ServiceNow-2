//Business Rule Loaner Initialize Dates
//Table Loaner Request
//Order 100
//When to run Before Insert Update

loanerInitDates();

function loanerInitDates() {
var start = current.start_date.getGlideObject().getNumericValue();
var end = current.end_date.getGlideObject().getNumericValue();
	
//Return reminder set to 15 hours before return date
var returnReminder = end - 54000000;
current.return_reminder.setDateNumericValue(returnReminder);
gs.log("Return " + current + gs.getUserID() + gs.getUserName() + current.return_reminder);	
gs.eventQueueScheduled('loaner.returnreminder', current, gs.getUserID(), gs.getUserName(), current.return_reminder);
}