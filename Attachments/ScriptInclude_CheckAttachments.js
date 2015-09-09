//Script Include
//checkAttachments
//Application Global
//Accessible from all application scopes
//check if the record has attachments
//ui action condition new global.checkAttachments().countAttachments(current)

var checkAttachments = Class.create();  
checkAttachments.prototype = {  
    initialize: function() {  
    },  
    countAttachments: function(record) {  
    var attachments = new GlideRecord('sys_attachment');  
    attachments.addQuery('table_sys_id',record.sys_id);  
    attachments.query();  
    if (attachments.next()) {
      return true;  
    }  
    type: 'checkAttachments'  
  }  
};