//Send REST API message to Casper Computer resource URL get serial numbers
/*try { 
    var rc = new sn_ws.RESTMessageV2('Casper_Computer', 'get');
    var res = rc.execute();
    var resBody = res.getBody();
    var httpSt = res.getStatusCode();
    var parsr = new JSONParser();  
    var parsd = parsr.parse(resBody);
    gs.log("Casper computer responseBody: " + resBody);
}
catch(ex) {
    var message = ex.getMessage();
}  

//Parse JSON object
for (i = 0; i < parsd.computers.length; i++){
//for (i = 0; i < 30; i++) {
    //Iterate each computer to get serial number
    var serial_number = parsd.computers[i].serial_number;
    var computer_name = parsd.computers[i].name;
    var casper_id = parsd.computers[i].id;
//  gs.log("Casper Computer Import: " + "SerialNumber: " + serial_number + "Computer Name: " + computer_name + "JSS ID : " + jss_id);
    //Casper Computer Serialnumber resource URL to get computer information
try {
    var r = new sn_ws.RESTMessageV2('Casper_Serialnumber', 'get');
    r.setStringParameter("serialnumber", serial_number);
    var response = r.execute();
    var responseBody = response.getBody();
    var httpStatus = response.getStatusCode();
    var parser = new JSONParser();  
    var parsed = parser.parse(responseBody);
//  gs.log("Casper serial number responseBody: " + resBody);
}
catch(ex) {
    var message = ex.getMessage();
}
    var serial_number = parsed.computer.general.serial_number;
    var casper_id = parsed.computer.general.id;
    var computer_name = parsed.computer.general.name;
    var mac_address = parsed.computer.general.mac_address;
    var ip_address = parsed.computer.general.ip_address;
    var alt_mac_address = parsed.computer.general.alt_mac_address;
    var warranty_expires = parsed.computer.purchasing.warranty_expires;
    var last_user = parsed.computer.location.username;
    var model = parsed.computer.hardware.model;
    var model_id = parsed.computer.hardware.model_identifier;
    var os_name = parsed.computer.hardware.os_name;
    var os_version = parsed.computer.hardware.os_version;
    var ram = parsed.computer.hardware.total_ram;
    var processor_type = parsed.computer.hardware.processor_type;
    var processor_speed = parsed.computer.hardware.processor_speed;
    var processor_count = parsed.computer.hardware.number_processors;
    gs.log("Casper Serialnumber Import: " + "Serialnumber: " + serial_number + "Mac address " + mac_address + "Alt mac : " + alt_mac_address);
    
   var cspcmp = new GlideRecord('u_imp_casper_computer');  
     cspcmp.initialize();  
     cspcmp.u_serial_number = serial_number;
     cspcmp.u_casper_id = casper_id;
     cspcmp.u_computer_name = computer_name;
//     cspcmp.u_mac_address = mac_address;
//   cspcmp.u_alt_mac_address = alt_mac_address;
     cspcmp.u_last_user = last_user;
     cspcmp.u_warranty_expires = warranty_expires;
     cspcmp.u_model = model;
     cspcmp.u_model_id = model_id;
     cspcmp.u_os_name = os_name;
     cspcmp.u_os_version = os_version;
     cspcmp.u_ram = ram;
     cspcmp.u_processor_type = processor_type;  
     cspcmp.u_processor_speed = processor_speed;  
     cspcmp.u_processor_count = processor_count;
     cspcmp.insert();

   var cspnet = new GlideRecord('u_imp_casper_network_adapter');  
     cspnet.initialize();  
     cspnet.u_casper_id = casper_id;
     cspnet.u_mac_address = mac_address;
     cspnet.u_ip_address = ip_address;
     cspnet.insert();
}

for (i = 0; i < parsed.computer.storage.length; i++){
    var disk_model = parsed.computer.storage[i].device.model;
    var disk_serial_number = parsed.computer.storage[i].device.serial_number;
    var disk_size = parsed.computer.storage[i].device.size; 
    var cspdisk = new GlideRecord('u_imp_casper_disk');  
    cspdisk.initialize(); 
    cspdisk.u_casper_id = casper_id;
    cspdisk.u_disk_model = disk_model;
    cspdisk.u_disk_serial_number = disk_serial_number;
    cspdisk.u_disk_size = disk_size;
    cspdisk.insert();       
    }
    */


try {
    var r = new sn_ws.RESTMessageV2('Casper_Serialnumber', 'get');
    r.setStringParameter("serialnumber", 'D25P40SVFY14');
    var response = r.execute();
    var responseBody = response.getBody();
    var httpStatus = response.getStatusCode();
    var parser = new JSONParser();  
    var parsed = parser.parse(responseBody);
    gs.log("Casper serial number responseBody: " + responseBody);
}
catch(ex) {
    var message = ex.getMessage();
}
for (i = 0; i < parsed.computer.hardware.storage.length; i++){
    var disk_model = parsed.computer.hardware.storage[i].model;
    var disk_serial_number = parsed.computer.hardware.storage[i].serial_number;
    var disk_size = parsed.computer.hardware.storage[i].size;
    var disk_percentage_full = parsed.computer.hardware.storage[i].partition.percentage_full;
    gs.log("Casper Import Disk: " + disk_model + "Disk Serialnumber: " + disk_serial_number + "Disk size: " + disk_size + "Percent full: " + disk_percentage_full);
}
/*if (!Array.isArray) {
  Array.isArray = function(arg) {
    return Object.prototype.toString.call(arg) === '[object Array]';
  };
}*/

// works    
//var storage = parsed.computer.hardware.storage[0].model;
    //var storage = parsed.computer.hardware.storage.length;
//  gs.log("Casper Import Disk: " + storage);

/*  var cspdisk = new GlideRecord('u_imp_casper_disk');  
    cspdisk.initialize(); 
    cspdisk.u_casper_id = casper_id;
    cspdisk.u_disk_model = disk_model;
    cspdisk.u_disk_serial_number = disk_serial_number;
    cspdisk.u_disk_size = disk_size;
    cspdisk.insert();   */
//  }
