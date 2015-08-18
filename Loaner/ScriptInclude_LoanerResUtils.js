//Script Include LoanerResUtils
//client callable All application scopes
//Class script include
var LoanerResUtils = Class.create();

LoanerResUtils.prototype = {
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
   * withdrawRequest - Update a request and all related bits
   *                   (child tasks are handled by a standard bus. rule)
   *
   * @param lr - GlideRecord of the request
   * @return None
   *
   **********/
  withdrawRequest : function(lr) {

    var wf = new Workflow();

    wf.cancel(lr);
    lr.active=false;
    lr.state=7;
    lr.update();

    gs.addInfoMessage(gs.getMessage('loaner_withdraw'));
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
//    var lr    = new GlideAggregate('loaner_request');
	var lr = new GlideAggregate('x_broi2_loaner_res_loaner_reservation');

  //  if (JSUtil.nil(ci))
  //    return false; // Null CI defaults to "not available"

	  if (ci instanceof GlideRecord)
      ci_id = ci.sys_id;
	  
/*    var myQuery = 'active=true^';
    myQuery += 'cmdb_ci.sys_id=' + ci + '^';
    myQuery += 'x_broi2_loaner_res_start_date<' + end + '^';
    myQuery += 'x_broi2_loaner_res_end_date>' + start + '^';
    myQuery += 'NQ';
    myQuery += 'active=true^';
    myQuery += 'cmdb_ci.sys_id=' + ci + '^';
    myQuery += 'x_broi2_loaner_res_end_date<' + gs.daysAgo(0);*/

    var myQuery = 'active=true^';
    myQuery += 'cmdb_ci.sys_id=' + ci + '^';
    myQuery += 'x_broi2_loaner_res_start_date<=' + end + '^';
    myQuery += 'x_broi2_loaner_res_end_date>=' + start + '^';
    myQuery += 'NQ';
    myQuery += 'active=true^';
    myQuery += 'cmdb_ci.sys_id=' + ci + '^';
    myQuery += 'x_broi2_loaner_res_end_date<=' + gs.daysAgo(0);
	  

	  
	 
	  gs.info("myQuery: " + myQuery);
    lr.addEncodedQuery(myQuery);
    lr.addAggregate('COUNT');
    lr.query();
    if (lr.next()) {
       count = lr.getAggregate('COUNT');
		gs.info("Count lr " + count + " sys_id " + ci_id);
		if (count == 0) {
			var answer = 'true';	
		}
		else if (count > 0) {
			var answer = 'false';
		}
    }

 //   return (count == 0);
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
  availableCis : function(class_name, pickup_location, start, end) {

    var ci                    = new GlideRecord('cmdb_ci');
 //   var installStatusProperty = gs.getProperty('glide.loaner.install_status');
 //   var checkAvailProperty    = gs.getProperty('glide.loaner.check_availability') == 'true';
    var availableItems        = [];
	//  gs.info("Glide record: " + ci);
	//  	  gs.info("Loaner ci class: " + class_name);
	  
    //if (!JSUtil.nil(installStatusProperty)) {
    //   ci.addQuery('install_status', 'IN', installStatusProperty);
    // }
//	  ci.addQuery('sys_id','03eee2b7c1f7210077ae9f5f3e49e9bb');
    ci.addQuery('loaner', true);
    ci.addQuery('sys_class_name', class_name);
    ci.addQuery('depot', pickup_location);
//	  gs.info("Ci query: " + ci.sys_id);
    ci.query();

    while (ci.next()) {
      var id = ci.sys_id.toString();
		gs.info("Ci sys_id: " + id);

  //    if (checkAvailProperty) {          // Check only available matching items
		var lnrUtil = new LoanerResUtils;

		gs.info("Count available: " + id + lnrUtil.isAvailable(id, start, end));
		
		if (lnrUtil.isAvailable(id, start, end) == 'true'){
 //       if (this.isAvailable(id, start, end)) {
          availableItems.push(id);
		}

  //    } else {                          // Take any matching items
  //     availableItems.push(id);
  //   }
    }
	  gs.info("Avail Items: " + availableItems.join(','));
    return availableItems.join(',');
  },

  type: 'LoanerResUtils'
}