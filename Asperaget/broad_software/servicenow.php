<?php
/*
*
* Aspera ServiceNow ticket creation and attachment script
* servicenow.php --create    //creates a servicenow INCident and prints the INC number
* servicenow.php --update=INC##### --attach=/var/tmp/test.txt      // sends the test.txt file as attachement to the ServiceNow INC
* servicenow.php --update=INC##### --message='some message'        // sends the message string to servicenow incident
*/

// TEST MODE SET TO 0 FOR PRODUCTION!!
$test =0;

     
    use BITS\ServiceNow\Api;
    if($test){
     include 'credentials-dev.php';
    }else{
     include 'credentials.php';     
    }
    $cwd = dirname(__DIR__);
    set_include_path($cwd . PATH_SEPARATOR . get_include_path());
     
    require_once 'servicenow-api/autoload.php';



/*
* Prints out usage for user
*/

function usage(){
 print "service.php --create|--update=<INCIDENT> [--attach=<PATH TO FILE TO ATTACH | --message='MESSAGE TO SEND']\n\n";
 exit(0);
}




/**
 * parseArgs Command Line Interface (CLI) utility function.
 * @author              Patrick Fisher <patrick@pwfisher.com>
 * @see                 http://github.com/pwfisher/CommandLine.php
 */
function parseArgs($argv) {
    $argv = $argv ? $argv : $_SERVER['argv']; array_shift($argv); $o = array();
    foreach ($argv as $a) {
        if (substr($a, 0, 2) == '--') { $eq = strpos($a, '=');
            if ($eq !== false) { $o[substr($a, 2, $eq - 2)] = substr($a, $eq + 1); }
            else { $k = substr($a, 2); if (!isset($o[$k])) { $o[$k] = true; } } }
        else if (substr($a, 0, 1) == '-') {
            if (substr($a, 2, 1) == '=') { $o[substr($a, 1, 1)] = substr($a, 3); }
            else { foreach (str_split(substr($a, 1)) as $k) { if (!isset($o[$k])) { $o[$k] = true; } } } }
        else { $o[] = $a; } 
        }
    return $o;
}


/*
* Just base64 encode the file we want to attach for ServiceNow
*/

function getFile($filename = null) {
        $contents = file_get_contents($filename);
     
        return base64_encode($contents);
}





/*
*  Simple function to create incident and return the INC number on success
*/
function newIncident($create) {

        $snapi = new Api($GLOBALS['sn_user'], $GLOBALS['sn_pass'], $GLOBALS['sn_url']);
        $inc = $snapi->factory('ITIL\Incident');
    	$data = array('assignment_group' => 'Data Transfers', 'description' => 'Aspera API Creation Site',
        	'short_description' => 'ASPGet request',
        	'caller_id' => "$create", 'category' => 'Support',
        	'location' => 'Remote'
        );

    	try {
        	$result = $inc->insert($data);
    	} catch (Exception $e) {
        	echo 'Exception: ' . $e->getMessage() . "\n";
        	exit(1);
    	}

    	if (!$result) {
        	echo "Failed to create incident.";
        	exit(2);
    	}

    	if (!isset($result->sys_id)) {
        	echo "Failed to create incident.";
        	exit(3);
    }
    $sys_id = $result->sys_id;
    $params = array('sys_id' => $sys_id);
    $incident = $inc->getRecords($params);
    return $incident[0]['number'];
}  





/*
*  Simple function to send attachment to an INC already created 
*  Takes the INC number and the FULL PATH of the filename to attach
*/ 

function Attachment($number,$payload) {

    $snapi = new Api($GLOBALS['sn_user'], $GLOBALS['sn_pass'], $GLOBALS['sn_url']);
    $inc = $snapi->factory('ITIL\Incident');
    $ecc = $snapi->factory('ECCQueue');
    $params = array('number' => $number);
    $incident = $inc->getRecords($params);
    if(!isset($incident[0]['sys_id'])){
      echo "Failed to retrieve incident Number!";
      exit(3);
    }
    $sysid = $incident[0]['sys_id'];

    $attachment = getFile($payload);
    $filename = basename($payload);
    $contentType = 'text/plain';
    $params = array('agent' => 'AttachmentCreator', 'topic' => 'AttachmentCreator',
        'name' => "$filename:$contentType", 'source' => "incident:$sysid",
        'payload' => $attachment
    );

    try {
        $result = $ecc->insert($params);
    } catch (Exception $e) {
        echo 'Exception: ' . $e->getMessage() . "\n";
        exit(4);
    }

    if (!$result) {
        echo "Failed to create attachment.";
        exit(5);
    }

    if (!isset($result->sys_id)) {
        echo "Failed to create attachment.";
        exit(6);
    }

    return 0;
}




/*
* Takes the INC number and the message is sent to the INC
*/

function Message($number,$message) {

    $snapi = new Api($GLOBALS['sn_user'], $GLOBALS['sn_pass'], $GLOBALS['sn_url']);
    $inc = $snapi->factory('ITIL\Incident');
    $params = array('number' => $number);
    $incident = $inc->getRecords($params);
    if(!isset($incident[0]['sys_id'])){
      echo "Failed to retrieve incident Number!";
      exit(3);
    }
    $sysid = $incident[0]['sys_id'];
    $assid = $incident[0]['assignment_group'];
    $callid = $incident[0]['caller_id'];
    $location = $incident[0]['location'];
    $params = array('sys_id' => "$sysid", 'comments' => "$message", 'description' => 'Aspera API Creation Site', 'location'=>"$location", 'category' => "Support", 'assignment_group' => "$assid", 'caller_id' => "$callid");
    try {
        $result = $inc->update($params);
    } catch (Exception $e) {
        echo 'Exception: ' . $e->getMessage() . "\n";
        exit(4);
    }
}




/*
*      MAIN
*/


$cmdinput = parseArgs($argv);

if(isset($cmdinput['create'])){
  $create = ($cmdinput['create']);
  // no email sent with create argument default to scs
  if($create == 1){
   $create = 'scs@broadinstitute.org';
  }
  $sysid = newIncident($create);
  print "$sysid\n";
}
elseif(isset($cmdinput['update']) && isset($cmdinput['attach'])){
  $update = ($cmdinput['update']);
  $payload = ($cmdinput['attach']);
  Attachment($update,$payload); 
}
elseif(isset($cmdinput['update']) && !isset($cmdinput['attach']) && isset($cmdinput['message'])){
  $update = ($cmdinput['update']);
  $message = ($cmdinput['message']);
  Message($update,$message);
}
else{
  usage();
}
exit(0);
 
?> 
