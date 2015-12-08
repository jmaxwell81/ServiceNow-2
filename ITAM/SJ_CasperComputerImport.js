//Scheduled Job Casper Computer Import

 try { 
 var r = new sn_ws.RESTMessageV2('casper_computer', 'get');
 var response = r.execute();
 var responseBody = response.getBody();
 var httpStatus = response.getStatusCode();
 var parser = new JSONParser();  
 var parsed = parser.parse(responseBody);
	 gs.log("Response: " + responseBody);
}
catch(ex) {
 var message = ex.getMessage();
}

for (i = 0; i < parsed.computers.length; i++){
	var id = parsed.computers[i].id;
	var name = parsed.computers[i].name;
	var model = parsed.computers[i].model;
	var mac = parsed.computers[i].mac_address;
	var serial_number = parsed.computers[i].serial_number;
	var username = parsed.computers[i].username;
	var udid = parsed.computers[i].udid;
	//gs.log("Casper Computer Import: " + name + model + mac + serial_number + username + udid + "ID: " + id);
}