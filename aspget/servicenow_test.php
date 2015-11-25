<?php
/*
*
* Aspera ServiceNow ticket creation and attachment script
* servicenow.php --create    //creates a servicenow INCident and prints the INC number
* servicenow.php --update=INC##### --attach=/var/tmp/test.txt      // sends the test.txt file as attachement to the ServiceNow INC
* servicenow.php --update=INC##### --message='some message'        // sends the message string to servicenow incident
*/

// TEST MODE SET TO 0 FOR PRODUCTION!!
$test = 1;

     
    use BITS\ServiceNow\Api;
    include 'credentials.php';     
    if($test){
     include 'credentials-dev.php';
    }else{
     include 'credentials.php';     
    }
    $cwd = dirname(__DIR__);
    set_include_path($cwd . PATH_SEPARATOR . get_include_path());
     
    require_once 'servicenow-api/autoload.php';
?>