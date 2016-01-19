/**
 * For variables go to: http://wiki.service-now.com/index.php?title=Import_Sets
 **/

if (action == 'insert'){ //So, this will run only if there is NO match on ResourceID.
checkSerialnumber();
}

function checkSerialnumber() {

var ci = new GlideRecord('cmdb_ci');
var sourceBIOSSerialNumber = source.u_biosserialnumber;
	gs.log("ITAM SCCM Computer source: " + source.u_biosserialnumber);

//Skip step if the serial number is invalid
	if (sourceBIOSSerialNumber != 'To Be Filled By O.E.M.' && sourceBIOSSerialNumber != '0123456789' && sourceBIOSSerialNumber != '') {
  	ci.addQuery('sys_class_name','cmdb_ci_computer');
  	ci.addQuery('serial_number', sourceBIOSSerialNumber);
  	ci.query(); //Look for an existing ci record with matching computer name.  

		if (ci.next()){ //if match is found, update the fields on that record.
		gs.log("ITAM SCCM Computer Identity ID: " + ci.name + "Old SCCM ID: " + ci.u_sccm_id + "replaced by New SCCM ID: " + source.u_sccm_id);
		ci.u_sccm_id = source.u_sccm_id;
		ci.update(); //save the updates
		ignore = true; //skip the updates defined in the map
		}

  //If there is NOT a match, a new record will automatically be inserted.

}
}