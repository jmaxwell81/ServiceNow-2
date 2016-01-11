/**
 * For variables go to: http://wiki.service-now.com/index.php?title=Import_Sets
 **/

if (action == 'insert'){ //So, this will run only if there is NO match on ResourceID.
checkSerialnumberCasper();
}

function checkSerialnumberCasper() {

var ci = new GlideRecord('cmdb_ci');
var sourceSerialnumberCasper = source.u_serial_number;
	gs.log("ITAM Casper Computer source: " + source.u_serial_number);

//Skip step if the serial number is invalid
	if (sourceSerialnumberCasper) {
  	ci.addQuery('sys_class_name','cmdb_ci_computer');
  	ci.addQuery('serial_number', sourceSerialnumberCasper);
  	ci.query(); //Look for an existing ci record with matching computer name.  

		if (ci.next()){ //if match is found, update the fields on that record.
		gs.log("ITAM Casper Computer Identity ID: " + ci.name + "Old Casper ID: " + ci.u_casper_id + " replaced by New Casper ID: " + source.u_casper_id);
		ci.u_casper_id = source.u_casper_id;
		ci.update(); //save the updates
		ignore = true; //skip the updates defined in the map
		}

  //If there is NOT a match, a new record will automatically be inserted.

}
}