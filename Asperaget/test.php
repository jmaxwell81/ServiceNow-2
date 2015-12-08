<?php

use BITS\ServiceNow\Api;

$cwd = dirname(__DIR__);
set_include_path($cwd . PATH_SEPARATOR . get_include_path());

require_once 'autoload.php';

$sn_user = 'user';
$sn_pass = 'pass';
$sn_url = 'https://example.service-now.com/';

$snapi = new Api($sn_user, $sn_pass, $sn_url);

$params = array('number' => 'xxxxxxx');
$p = $snapi->factory('problem');
print_r($p->soapFields); echo "\n";
$result = $p->getRecords($params);

print_r($result);

exit();

?>
