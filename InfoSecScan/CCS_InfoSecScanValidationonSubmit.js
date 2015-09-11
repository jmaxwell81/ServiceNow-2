//Catalog Client Script
//InfoSec Scan Validation onSubmit
function onSubmit() {
		var isValid = checkInfoSecScan();
		if (isValid == false) {
			g_form.submitted = false;
			return false;
		}
}
function checkInfoSecScan() {
		g_form.hideAllFieldMsgs('error');
		
	var ipAddress = g_form.getValue('x_broi2_infosec_sc_ip_address');
	var domain = g_form.getValue('x_broi2_infosec_sc_domain_name');
	var ack = g_form.getValue('x_broi2_infosec_sc_acknowledgement');
	
	//One of the fields IP Address or hostname is required
	if (ipAddress == '' && domain == ''){
		g_form.showFieldMsg('x_broi2_infosec_sc_ip_address', 'ERROR: Please enter either an IP Address or a Hostname','error');
		g_form.showFieldMsg('x_broi2_infosec_sc_domain_name', 'ERROR: Please enter either an IP Address or a Hostname','error');
		return false;
	}
	
	if (ipAddress != ''){
		var checkIpAddress = isValidIp(ipAddress);
		if (checkIpAddress == false) {
		g_form.showFieldMsg('x_broi2_infosec_sc_ip_address', 'ERROR: The IP Address is in an invalid format. Please enter an IPv4 Address E.G. 192.168.1.100','error');
		return false;
		}
	}
	
	if (domain != ''){
		var checkDomain = isValidDomain(domain);
		if (checkDomain == false) {
		g_form.showFieldMsg('x_broi2_infosec_sc_domain_name', 'ERROR: The domain name is an invalid format. Please enter a valid Hostname E.G. example.broadinstitute.org','error');
		return false;
		}
	}

		if (ack != 'yes') {
		g_form.showFieldMsg('x_broi2_infosec_sc_acknowledgement', 'ERROR: The answer to Acknowledgement must be a Yes. I acknowledge that if any changes are made to the system after the initial scan, another scan will be required.','error');
		return false;
		}
}

//Check validation input functions
		function isValidIp(ip) {
		//Get data input
		var userIp = ip;
		//Create regex to match ip address
		var IpRegEx = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
		//Check ip address format	
		if (!IpRegEx.test(userIp)) {
			return false;
		}
		}

		function isValidDomain(domain) {
		//Get data input
		var userDomain = domain;
		//Create regex to match domain name
		//var domainRegEx = /^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/;
		//Create regex to match hostname	
		var hostnameRegEx = /^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])$/;
		//Check domain name format
		if (!hostnameRegEx.test(userDomain)) {
			return false;
		}
		}