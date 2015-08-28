var LoanerResUtils = Class.create();

LoanerResUtils.prototype = {
  initialize: function() {  
    },
  getOverdueReservations : function() {

    var a = new Array();
    var gr = new GlideRecord('loaner_request');
 
    gr.addQuery('end_date', '<=', gs.nowDateTime());
    gr.addQuery('state', 16);
    gr.query();

    while (gr.next()) {
      a.push(gr.sys_id.toString());
    }
    return a;
  },
   
  /*********
   *
   * isAvailable - check to see if there are no conflicts w/ci
   *               being available between start and end times
   *               and CI is "in" (loaner request state=Requested, Closed, Withdrawn)
   *
   * @param ci - GlideRecord or sys_id of the CI being requested
   * @param start - start date-time of the requested reservation
   * @param end - end date-time of the requested reservation
   * @return boolean - true=no conflicts
   *
   **********/
  isAvailable : function(ci, start, end) {

    var ci_id = ci;
    var count = 0;
  var lr = new GlideAggregate('x_broi2_loaner_res_loaner_reservation');

  if (ci instanceof GlideRecord)
    ci_id = ci.sys_id;
  //Build encoded query that checks if the ci is available between selected start and end dates
    var myQuery = 'active=true^';
    myQuery += 'cmdb_ci.sys_id=' + ci + '^';
    myQuery += 'x_broi2_loaner_res_start_date<=' + end + '^';
    myQuery += 'x_broi2_loaner_res_end_date>=' + start + '^';
    myQuery += 'NQ';
    myQuery += 'active=true^';
    myQuery += 'cmdb_ci.sys_id=' + ci + '^';
    myQuery += 'x_broi2_loaner_res_end_date<=' + gs.daysAgo(0);

    lr.addEncodedQuery(myQuery);
    lr.addAggregate('COUNT');
    lr.query();
    if (lr.next()) {
       count = lr.getAggregate('COUNT');
    //If query returns zero items then it is available between selected start and end dates
    if (count == 0) {
      var answer = true;  
    }
    else if (count > 0) {
      var answer = false;
    }
    }
    return answer;
  },

  /**********
   *
   * availableCis - get a list of CIs in a class/depot that are available
   *
   * @param class_name - CI class
   * @param depot_name - Name of the pick up location
   * @param start - reservation start date
   * @param end - reservation end date
   * @return - comma separated list of sys_ids that are available at that time
   *
   **********/
  availableCis : function(class_name, pickup_location, manufacturer, start, end) {
  //Make a new query on the cmdb_ci table
    var ci                    = new GlideRecord('cmdb_ci');
  //Create an empty array
    var availableItems        = [];
  //Build a query which maps to input parameters
    ci.addQuery('loaner', true);
    ci.addQuery('sys_class_name', class_name);
    ci.addQuery('depot', pickup_location);
  ci.addQuery('install_status','1');
  //If Item Type is laptop must filter by manufacturer
    if (class_name == 'cmdb_ci_computer') {  
  ci.addQuery('manufacturer.name', manufacturer); 
    }
    ci.query();
  //While loop on each ci the query returns
    while (ci.next()) {
  //Grab the sys_id of the returned ci and convert to string
    var id = ci.sys_id.toString();
    
    var lnrUtil = new LoanerResUtils;
    //Run each CI id through the isAvailable function that checks if ci is available between start and end dates
    if (lnrUtil.isAvailable(id, start, end)){
      //If the ci is available between start and end dates add to the array
          availableItems.push(id);
    }
    }
  //Populate the reference qualifier items return sys_ids in a comma separated list
    return availableItems.join(',');
  },

  type: 'LoanerResUtils'
}