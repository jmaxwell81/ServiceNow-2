//Reference Qualifier LoanerRefQRP
//To create advanced reference qualifier javascript:global.LoanerRefQRP()
//Client Callable true

function LoanerRefQRP() {
  var answer;
  var lu = new LoanerResUtil();
  var pickup_location = current.variables.u_pickup_location.toString();
  var item_type = current.variables.u_item_type;
  var start_date = current.variables.u_start_date;
  var end_date = current.variables.u_end_date;
  var manufacturer = current.variables.u_laptop_type;
  answer = 'sys_idIN' + lu.availableCis(item_type, pickup_location, manufacturer, start_date, end_date);
	return answer;
}