// Set Warranty Expiration
var wx = new Date();
wx = source.u_warranty_expiration.toString();
target.warranty_expiration = wx;

// Check for existing product model, stop when the first one is found
var model = new GlideRecord('cmdb_model');
model.addQuery('name', source.u_model_name);	
model.setLimit(1);							
model.query();

// If product model already exists, get its sys_id and model category to apply to the asset
if (model.next()){
    var myModel = model.sys_id;
    var myModelCategory = model.cmdb_model_category;
}

// When product model does not exist, create a new product model with values from the import table
else {
    
    model.name = source.u_model_name;
    model.model_number = source.u_model_number;
    model.manufacturer.setDisplayValue(source.u_manufacturer);
    model.cmdb_model_category.setDisplayValue(source.u_category);
    
    var myModel = model.insertWithReferences();
    
    var newProdModel = new GlideRecord('cmdb_model');
    
    newProdModel.get(myModel);
    var myModelCategory = newProdModel.cmdb_model_category;

}

// Set the model and model category fields on the new asset record from the product model record
target.model = myModel;
target.model_category = myModelCategory;