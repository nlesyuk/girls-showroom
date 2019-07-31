<?php


$ip = explode(",", $IPs);
echo $ip;
$get_location = "https://api.ipinfodb.com/v3/ip-city/?key=10376990a6c7e07567a8beeda379911a15af1bcc5e86e898820530ab5c79dc1c&ip=".trim($ip[0]);
echo "+++++++++++++++++++++++++++++++++++++++++\n\t";
echo file_get_contents($get_location);


?>