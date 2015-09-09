attachmentLinks();
function attachmentLinks() {
	//Check for any attachments and add attachment links if they exist
	var gr = new GlideRecord('sys_attachment');
	gr.addQuery('table_sys_id',current.sys_id);
	//gr.addQuery('sys_created_on', '>=', 'javascript:gs.minutesAgo(243)');	// must update this to accomodate for UTC daylight saving time offset
	gr.orderBy('sys_created_on');
	gr.query();
if (gr.hasNext()) {
	template.print("Attachmentsa: <br />");
	while (gr.next()) {
		//Created on date
		var createdOn = gr.sys_created_on.getDisplayValue();
		//Create a GlideDateTime object
		var gdtCreatedOn = new GlideDateTime();
		//Set gdt object to Created On date time
		gdtCreatedOn.setDisplayValue(createdOn);
		//Get number of milliseconds Created On date time
		var createdOnNum = gdtCreatedOn.getNumericValue();
		//Now Date
		var now = gs.nowDateTime();
		var gdtNow = new GlideDateTime();
		var nowNum = gdtNow.getNumericValue();
		//Subtract nownum by 3 minutes
		var nowNumAgo = nowNum - 180000;
		//Print links for the latest attachments added in the past 3 minutes
		if (createdOnNum > nowNumAgo) {
		var attachLink = '<a href="' + gs.generateURL(gr.getTableName(),gr.sys_id) +  '">' + gr.file_name + '</a>';
		template.print("Created on " + createdOnNum + "Now " + nowNum + "Now 3min ago" + nowNumAgo + attachLink + "Created by " + gr.sys_created_by.getDisplayValue() + "Created on " + gr.sys_created_on.getDisplayValue() + "3min ago " + gs.minutesAgo(243) + "<br />");
			}
		}
		template.print("<hr/>");
	}
}