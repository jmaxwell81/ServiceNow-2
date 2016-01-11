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

//setMakeAndModel();
setLastScan();
setModel();

/*function setMakeAndModel() {
	var mm = MakeAndModelJS.fromNames(source.u_manufacturer, source.u_model, "hardware");
    target.model_id = mm.getModelNameSysID();
    target.manufacturer = mm.getManufacturerSysID();	
}*/


function setLastScan(){
// Set Warranty Expiration
var wx = new Date();
wx = source.u_sccm_last_scan.toString();
target.u_sccm_last_scan = wx;
}

function setModel(){
// Check for existing product model, stop when the first one is found
var model = new GlideRecord('cmdb_model');
model.addQuery('name', source.u_model_id);	
model.setLimit(1);							
model.query();

// If product model already exists, get its sys_id and model category to apply to the asset
if (model.next()){
    var myModel = model.sys_id;
    var myModelCategory = model.cmdb_model_category;
}

// When product model does not exist, create a new product model with values from the import table
else {
    model.name = source.u_model_id;
    model.model_number = source.u_model_id;
    model.manufacturer.setDisplayValue(source.u_manufacturer);
    model.cmdb_model_category.setDisplayValue('Computer');
    
    var myModel = model.insertWithReferences();
    
    var newProdModel = new GlideRecord('cmdb_model');
    
    newProdModel.get(myModel);
    var myModelCategory = newProdModel.cmdb_model_category;

}

// Set the model and model category fields on the new asset record from the product model record
target.model_id = myModel;
target.model_category = myModelCategory;
}