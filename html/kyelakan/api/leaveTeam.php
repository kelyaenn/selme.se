<?php
$entityBody = file_get_contents('php://input');
$body = json_decode($entityBody);

$id = $body->id;
$teamId = $body->teamId;
$apiKey = $body->apiKey;
require_once 'id.php';
if(isset($id) && isset($teamId)  && isset($apiKey) && $apiKey == $actualApiKey){


$conn = new mysqli($servername, $username, $password,$dbname);
if($conn->connect_error)
{
    $success = false;
    echo json_encode(array('success' => $success));
    exit();
}

$sql = sprintf("DELETE FROM `teamUserLink` WHERE id_team='%s' AND id_user='%s'", $conn->real_escape_string($teamId), $conn->real_escape_string($id));

if ($conn->query($sql) === TRUE) {
    $success = true;
  } else {
    $success = false;
  }
echo json_encode(array('success' => $success));
}
?>