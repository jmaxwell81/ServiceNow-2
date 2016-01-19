//SCCM Import Utility methods
//Transform Map SCCM Computer Identity Field Map Source Script [target: model_id] answer = SCCMUtil.findModel(source.u_model_id, 'Computer');
//Transform Map SCCM Network Adapter Field Map Source Script [target: cmdb_ci] answer = SCCMUtil.findComputer(source.u_resourceid);

var SCCMUtil = Class.create();

SCCMUtil.findComputer = function(id) {
    // Find the SCCM ID in the correlation_id field
    var gr = new GlideRecord("cmdb_ci_computer");
    gr.addQuery("u_sccm_id", id);
    gr.query();
    if (gr.next()) {
        return gr.sys_id + '';
    }
   // Find the SCCM ID in the source table
    var gr = new GlideRecord("sys_object_source");
    gr.addQuery("name", "SCCM");
    gr.addQuery("id", id);
    gr.query();
    if (gr.next()) {
        var grr = new GlideRecord(gr.target_table + '');
        if (grr.get(gr.target_sys_id + ''))
            return grr.sys_id + '';
    }

    else return null;    
},
    
    SCCMUtil.findModel = function(modelName, ciClass) {
    var model = new GlideRecord('cmdb_model');
    model.addQuery('name', modelName);
    model.setLimit(1);                          
    model.query();

// If product model already exists, get its sys_id and model category to apply to the configuration item
if (model.next()){
    var modelSysId = model.sys_id;
    var modelCategory = model.cmdb_model_category;
        return modelSysId + '';    
}

// When product model does not exist, create a new product model with values from the import table
else {
    var newModel = new GlideRecord('cmdb_hardware_product_model');
    newModel.initialize();
    newModel.name = modelName;
    newModel.manufacturer.setDisplayValue(source.u_manufacturer);
    if (ciClass == 'Disk'){
    newModel.cmdb_model_category.setDisplayValue('Disk');
    }
    else if (ciClass == 'Network Adapter'){
    newModel.cmdb_model_category.setDisplayValue('Network Adapter');
    }
    else {
    newModel.cmdb_model_category.setDisplayValue('Computer');
//    newModel.name = source.u_model;
    }
    var modelSysId = newModel.insert();
        return modelSysId + '';
}
},



SCCMUtil.prototype = {  

    initialize: function() {
    },

    type: "SCCMUtil"
};