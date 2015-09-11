//Business Rule InfoSec Scan Validation
//Order 100
//When Before Insert Update

function onBefore(current, previous) {
checkInfoSecScan();
function checkInfoSecScan() {
		
	var ipAddress = current.x_broi2_infosec_sc_ip_address;
	var domain = current.x_broi2_infosec_sc_domain_name;
	
	if (ipAddress != ''){
		var checkIpFormat = isValidIp(ipAddress);
		if (checkIpFormat == false) {
		gs.addInfoMessage('ERROR: The IP Address is in an invalid format. Please enter an IPv4 Address E.G. 192.168.1.100');
		stopSubmit();
		}
	}
	if (domain != ''){
		var checkDomainName = isValidDomain(domain);
		if (checkDomainName == false) {
		gs.addInfoMessage('ERROR: The domain name is an invalid format. Please enter a valid Hostname E.G. example.broadinstitute.org');
		stopSubmit();
		}
	}
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
	


		function stopSubmit() {
		gs.addErrorMessage("Record submission aborted");
		current.setAbortAction(true);
		gs.setRedirect(current);
		}