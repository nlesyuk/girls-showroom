<?php
// header("Content-Type: text/html; charset=utf-8");
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

$json = file_get_contents("data.json");
// $json = json_decode( $json );
// echo json_encode( $json );
echo $json;

// echo json_encode(array('foo' => 'bar'));
exit;
?>