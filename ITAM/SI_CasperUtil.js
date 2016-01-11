//Casper Util
//Transform Map Field Map Source Script answer = CasperComputerModelUtil.findModel(source.u_model);
/* Casper Import Utility methods */

var CasperUtil = Class.create();

CasperUtil.findComputer = function(id) {
    // Find the Casper ID in the casper_id field
    var gr = new GlideRecord("cmdb_ci_computer");
    gr.addQuery("u_casper_id", id);
    gr.query();
    if (gr.next()) {
		gs.log("CasperUtil casper id: " + gr.sys_id);
        return gr.sys_id + '';
	}
   // Find the SCCM ID in the source table
/*   var gr = new GlideRecord("sys_object_source");
    gr.addQuery("name", "Casper");
    gr.addQuery("id", id);
    gr.query();
    if (gr.next()) {
        var grr = new GlideRecord(gr.target_table + '');
        if (grr.get(gr.target_sys_id + ''))
			gs.log("CasperUtil target table: " + gr.sys_id);
            return grr.sys_id + '';
    } */

    else return null;    
},

CasperUtil.findModel = function(modelName) {
    gs.log("CasperComputerModelUtil Model Name: " + modelName);
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
    gs.log("ITAM Casper Computer Model Util New Model: " + modelSysId);
        return modelSysId + '';
}
},


CasperUtil.prototype = {  

    initialize: function() {
    },

    type: "CasperUtil"
};