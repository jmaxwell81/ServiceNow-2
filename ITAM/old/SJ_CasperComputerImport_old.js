 



 /*try { 
 var r = new sn_ws.RESTMessageV2('casper_computer', 'get');
 var response = r.execute();
 var responseBody = response.getBody();
 var httpStatus = response.getStatusCode();
 var parser = new JSONParser();  
 var parsed = parser.parse(responseBody);
}
catch(ex) {
 var message = ex.getMessage();
}

for (i = 0; i < parsed.computer_reports.length; i++){
//for (i = 0; i < 30; i++) {
    var jss_id = parsed.computer_reports[i].JSS_Computer_ID;
    var serial_number = parsed.computer_reports[i].Serial_Number;
    var username = parsed.computer_reports[i].Username;
    var computer_name = parsed.computer_reports[i].Computer_Name;
    var model_name = parsed.computer_reports[i].Model;
    var model_id = parsed.computer_reports[i].Model_Identifier;
    var mac_address = parsed.computer_reports[i].MAC_Address;
    var ip_address = parsed.computer_reports[i].IP_Address;
    var total_ram_mb = parsed.computer_reports[i].Total_RAM_MB;  
    var operating_system = parsed.computer_reports[i].Operating_System;
//  var warranty_expiration = parsed.computer_reports[i].Warranty_Expiration; date formatter issue
    var number_of_processors = parsed.computer_reports[i].Number_of_Processors;  
    var processor_speed_mhz = parsed.computer_reports[i].Processor_Speed_MHz;  
    var processor_type = parsed.computer_reports[i].Processor_Type;     
    gs.log("Casper Computer Import: " + computer_name + model_name + model_id + mac_address + serial_number  + username + total_ram_mb + operating_system + "Number of processors: " + number_of_processors + "P speed: " + processor_speed_mhz + processor_type + "JSS ID: " + jss_id);

   var jsscmp = new GlideRecord('u_import_casper_computer');  
     jsscmp.initialize();  
     jsscmp.u_jss_id = jss_id;
     jsscmp.u_serial_number = serial_number;
     jsscmp.u_username = username;
     jsscmp.u_computer_name = computer_name;
     jsscmp.u_model_name = model_name;
     jsscmp.u_model_id = model_id;
     jsscmp.u_ram_mb = total_ram_mb;
     jsscmp.u_operating_system = operating_system;
//   jsscmp.u_warranty_expiration = warranty_expiration;
     jsscmp.u_number_of_processors = number_of_processors;  
     jsscmp.u_processor_speed_mhz = processor_speed_mhz;  
     jsscmp.u_processor_type = processor_type;
     jsscmp.insert();


   var jssnet = new GlideRecord('u_import_casper_network_adapter');  
     jssnet.initialize();  
     jssnet.u_mac_address = mac_address;
     jssnet.u_ip_address = ip_address;
     jssnet.insert();
}
*/




try { 
 var r = new sn_ws.RESTMessageV2('Casper_Serialnumber', 'get');
 r.setStringParameter("serialnumber", 'C02P90HLG3QP');
 var response = r.execute();
 var responseBody = response.getBody();
 var httpStatus = response.getStatusCode();
 var parser = new JSONParser();  
 var parsed = parser.parse(responseBody);
}
catch(ex) {
 var message = ex.getMessage();
}

for (i = 0; i < parsed.computers.length; i++){
//for (i = 0; i < 30; i++) {
    var jss_id = parsed.computers[i].JSS_Computer_ID;
    var serial_number = parsed.computers[i].Serial_Number;
    gs.log("Casper Computer Import: " + "SerialNumber: " + serial_number + "JSS ID: " + jss_id);
}