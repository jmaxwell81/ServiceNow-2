//Reference Qualifier LoanerRefQRP
//To create advanced reference qualifier dictionary entry override javascript:new LoanerRefQ().availCI()
//Client Callable false

var LoanerRefQ = Class.create();
LoanerRefQ.prototype = {
    initialize: function() {
    },
    availCI: function() {
  var answer;
  var lu = new LoanerResUtil();
  var pickup_location = current.u_pickup_location.toString();
  var item_type = current.u_item_type;
  var start_date = current.u_start_date;
  var end_date = current.u_end_date;
  var manufacturer = current.u_laptop_type;
  answer = 'sys_idIN' + lu.availableCis(item_type, pickup_location, manufacturer, start_date, end_date);
		gs.log("LoanerRefQ().availCI() " + answer);
	return answer;
},

    type: 'LoanerRefQ'
};