setModel();
function setModel(){
// Check for existing product model, stop when the first one is found
var model = new GlideRecord('cmdb_model');
model.addQuery('name', '15-inch MacBook Pro (Mid 2010)');	 //iMac Intel (Early 2009)
model.setLimit(1);							
model.query();

// If product model already exists, get its sys_id and model category to apply to the configuration item
if (model.next()){
    var modelSysId = model.sys_id;
    var modelCategory = model.cmdb_model_category;
    gs.log("Model sys_id :" + modelSysId + "Model Category: " + modelCategory)
}

// When product model does not exist, create a new product model with values from the import table
else {
/*    model.name = source.u_model_id;
    model.model_number = source.u_model_id;
    model.manufacturer.setDisplayValue(source.u_manufacturer);
    model.cmdb_model_category.setDisplayValue('Computer');
    var myModel = model.insertWithReferences();
    var newProdModel = new GlideRecord('cmdb_model');
    
    newProdModel.get(myModel);
    var myModelCategory = newProdModel.cmdb_model_category; */

/*    newModel.name = source.u_model;
    newModel.model_id = source.u_model_id;  */

    var newModel = new GlideRecord('cmdb_hardware_product_model');  
    newModel.initialize();  

    newModel.name = '15-inch MacBook Pro (Mid 2010)';
    newModel.model_id = 'MacBook Pro 9,1';
    newModel.cmdb_model_category.setDisplayValue('Computer');
    var modelSysId = newModel.insertWithReferences();
    gs.log("Target model: " + modelSysId);
}

//target.model_id = modelSysid;
//target.model_category = myModelCategory;
}