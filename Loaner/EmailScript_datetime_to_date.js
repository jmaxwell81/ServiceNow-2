//Email Script datetime_to_date
var gr = new GlideRecord("loaner_request");
	gr.addQuery("sys_id",current.sys_id);
	gr.query();
while(gr.next()) {
	var start_date = gr.start_date;
	var end_date = gr.end_date;	
	var startGDT = new GlideDate();  
    startGDT.setDisplayValue(start_date);
	var endGDT = new GlideDate(); 
	endGDT.setDisplayValue(end_date);
	
template.print("was picked up on " + startGDT +  " was due on " + endGDT);
}