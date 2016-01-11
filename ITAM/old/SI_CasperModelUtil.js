// Casper Model Import Utility

var CasperModelUtil = Class.create();
CasperModelUtil.findModel = function(modelName) {
    gs.log("CasperModelUtil Model Name: " + modelName);
    var model = new GlideRecord('cmdb_model');
    model.addQuery('name', modelName);  //iMac Intel (Early 2009)
    model.setLimit(1);                          
    model.query();

// If product model already exists, get its sys_id and model category to apply to the configuration item
if (model.next()){
    var modelSysId = model.sys_id;
    var modelCategory = model.cmdb_model_category;
    gs.log("Model sys_id :" + modelSysId + "Model Category: " + modelCategory);
        return modelSysId + '';    
}

// When product model does not exist, create a new product model with values from the import table
else {
    var newModel = new GlideRecord('cmdb_hardware_product_model');
    newModel.initialize();
    newModel.name = source.u_model;
    newModel.model_number = source.u_model_id;
    newModel.manufacturer.setDisplayValue(source.u_make);
    newModel.cmdb_model_category = 'Computer';
    var modelSysId = newModel.insert();
    gs.log("ITAM Casper Model Util New Model: " + modelSysId);
        return modelSysId + '';
}


},
CasperModelUtil.prototype = {  
    initialize: function() {
    },
    type: "CasperModelUtil"
};