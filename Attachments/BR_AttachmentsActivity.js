//Business Rule Attachments Activity
//When After Insert Update
//Order 100

attachmentActivity();

function attachmentActivity() {
	var instancename = gs.getProperty("instance_name");
    var attachmentMsg = '';
    var gr = new GlideRecord(current.table_name);
    if (gr.get(current.table_sys_id)) {
        if (current.operation() == 'delete') {
            attachmentMsg = 'Attachment deleted: '+current.file_name+' by ' +current.sys_created_by+' on '+gs.nowDateTime();
        }
        else {
            attachmentMsg = 'Attachment added: [code]<a href="' + gs.getProperty("glide.servlet.uri") + gs.generateURL(current.getTableName(),current.sys_id) +  '">' + current.file_name + '</a>' + ' ' + '<a href="https://'+instancename+'.service-now.com/sys_attachment.do?sysparm_referring_url_tear_off&view=true&sys_id=' + current.sys_id +  '" target="_blank">' + '[View]' + '</a>[/code]' + ' by '+current.sys_created_by+' on ' + current.sys_created_on.getDisplayValue();
        }
        gr.u_attachment_changes=attachmentMsg;
        gr.update();
    }
}