<?php
// header("Content-Type: text/html; charset=utf-8");
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

function get_ip(){
    if (!empty($_SERVER['HTTP_CLIENT_IP']))    {
        $ip = $_SERVER['HTTP_CLIENT_IP'];
    } elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR']))    {
        $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
    } else {
        $ip = $_SERVER['REMOTE_ADDR'];
    }
    return $ip;
}

$json = file_get_contents("data.json");

$obj = json_decode($json, true); // расшифровывает JSON как асоциативный массив
$obj['maps']['user_ip'] = get_ip(); // узнаем IP юзера
$new_json = json_encode( $obj ); // зашифровывает в JSON

file_put_contents('php/data.json', $new_json);

echo $new_json;
?>