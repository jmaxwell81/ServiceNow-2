(function(){ //Send REST API message to Casper Computer resource URL get serial numbers
try { 
    var rc = new sn_ws.RESTMessageV2('Casper_Computer', 'get');
    var res = rc.execute();
    var resBody = res.getBody();
    var httpSt = res.getStatusCode();
    var parsr = new JSONParser();  
    var parsd = parsr.parse(resBody);
}
catch(ex) {
    var message = ex.getMessage();
}  
//gs.log("ITAM Casper Import parsd computers length: " + parsd.computers.length);

//Parse JSON object
for (var i = 0; i < parsd.computers.length; i++){
//for (var i = 0; i < 30; i++) {
    var serial_number = parsd.computers[i].serial_number;
    //Query computer table set search parameter to each serial number
try {
    var r = new sn_ws.RESTMessageV2('Casper_Serialnumber', 'get');
    r.setStringParameter("serialnumber", serial_number);
    var response = r.execute();
    var responseBody = response.getBody();
    var httpStatus = response.getStatusCode();
    var parser = new JSONParser();  
    var parsed = parser.parse(responseBody);
}
catch(e) {
    var ms = e.getMessage();
}
    var casper_id = parsed.computer.general.id;
// test new id  var casper_id = '123117';
    if (casper_id){
    var computer_name = parsed.computer.general.name;
    var mac_address = parsed.computer.general.mac_address;
    var ip_address = parsed.computer.general.ip_address;
    var mac_address_alt = parsed.computer.general.alt_mac_address;
    var casper_last_scan = parsed.computer.general.last_contact_time;
    var warranty_expires = parsed.computer.purchasing.warranty_expires;
    var last_user = parsed.computer.location.username;
    var make = parsed.computer.hardware.make;
    var model = parsed.computer.hardware.model;
    var model_id = parsed.computer.hardware.model_identifier;
    var os_name = parsed.computer.hardware.os_name;
    var os_version = parsed.computer.hardware.os_version;
    var dns_domain = parsed.computer.hardware.active_directory_status;
    var ram = parsed.computer.hardware.total_ram;
    var processor_type = parsed.computer.hardware.processor_type;
    var processor_speed = parsed.computer.hardware.processor_speed;
    var processor_count = parsed.computer.hardware.number_processors;
    }
    gs.log("Number i : " + i + " Computer name: " + computer_name + "Mac Address: " + mac_address + "Model: " + model + "Casper Last Scan: " + casper_last_scan + "Warranty expires: " + warranty_expires);
    
    //Load hardware information into Casper Computer import table
    var cspcmp = new GlideRecord('u_imp_casper_computer');  
    cspcmp.initialize();  
    cspcmp.u_serial_number = serial_number;
    cspcmp.u_casper_id = casper_id;
    cspcmp.u_computer_name = computer_name;
    if (last_user){
    cspcmp.u_last_user = last_user;
    }
    cspcmp.u_casper_last_scan = parsed.computer.general.last_contact_time;
    cspcmp.u_warranty_expires = parsed.computer.purchasing.warranty_expires;
    cspcmp.u_make = make;
    cspcmp.u_model = model;
    cspcmp.u_model_id = model_id;
    cspcmp.u_os_name = os_name;
    cspcmp.u_os_version = os_version;
    cspcmp.u_dns_domain = dns_domain;
    cspcmp.u_ram = ram;
    cspcmp.u_processor_type = processor_type;  
    cspcmp.u_processor_speed = processor_speed;  
    cspcmp.u_processor_count = processor_count;
    cspcmp.insert();

    //Load IP and Mac address Casper Network Adapter table
    var cspnet = new GlideRecord('u_imp_casper_network_adapter');  
    cspnet.initialize();  
    cspnet.u_casper_id = casper_id;
    cspnet.u_mac_address = mac_address;
    cspnet.u_ip_address = ip_address;
    cspnet.insert();

    //Load Alt Mac address Casper Network Adapter Alt table
    if (mac_address_alt){
    var cspnetalt = new GlideRecord('u_imp_casper_network_adapter_alt');  
    cspnetalt.initialize();  
    cspnetalt.u_casper_id = casper_id;
    cspnetalt.u_mac_address_alt = mac_address_alt;
    cspnetalt.insert();
    }

    //Load disks into Casper Disk table
    //computer.hardware.storage is an array object
for (var n = 0; n < parsed.computer.hardware.storage.length; n++){
    
    gs.log("ITAM Casper Import Disk storage device length: " + parsed.computer.hardware.storage.length);
    
    var disk_model = parsed.computer.hardware.storage[n].model;
    var disk_serial_number = parsed.computer.hardware.storage[n].serial_number;
    var disk_size = parsed.computer.hardware.storage[n].size;
    var disk_percentage_full = parsed.computer.hardware.storage[n].partition.percentage_full;
    
    //Computers might have disks with blank serial numbers
    if(disk_serial_number){
    var cspdisk = new GlideRecord('u_imp_casper_disk');  
    cspdisk.initialize();
    cspdisk.u_serial_number = serial_number;    
    cspdisk.u_casper_id = casper_id;
    cspdisk.u_make = make;
    cspdisk.u_disk_serial_number = disk_serial_number;
    cspdisk.u_disk_model = disk_model;
    cspdisk.u_disk_size = disk_size;
    if (disk_percentage_full){
    cspdisk.u_disk_percentage_full = disk_percentage_full;
    }
    cspdisk.insert();
    }
}
}
})();