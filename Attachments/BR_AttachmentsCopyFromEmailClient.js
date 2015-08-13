//Business Rule Attachments copy from Email Client
//Table sys_email
//When After Insert Update Order 10,000
//Condition current.type == 'sent' && current.headers.indexOf('X-ServiceNow-Source: EmailClient') > -1 && current.target_table.indexOf('incident') > -1

emailClientMessage();

function emailClientMessage() {
//Copy attachments from the email client to the target table
GlideSysAttachment.copy("sys_email", current.sys_id, current.target_table, current.instance);
var record = new GlideRecord(current.target_table);
//Grab the email message that matches the record
record.addQuery('sys_id', current.instance);
record.query();
if (record.next()) {
	gs.log("Email Client message sent. Record: " + record.number + "Created by: " + current.sys_created_by + "User: " +current.user);
//Get the client email message that was sent and add it to the work notes
	record.comments = "[code]" + "Email client message sent: " + current.body + "<br />Created by: " + current.sys_created_by +"[/code]";
	record.update();
		}
}