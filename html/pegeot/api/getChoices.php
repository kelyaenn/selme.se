<?php
require_once 'id.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    echo json_encode(array('success' => false));
    exit();
}
$sql = "SELECT * FROM choices";
$result = $conn->query($sql);

$response = array();
if ($result) {
    while($row = $result->fetch_assoc()) {
        $response[] = $row;
    }
    echo json_encode($response);
    $conn->close();
    exit();
} else {
    echo json_encode(array('success' => false));
    $conn->close();
    exit();
}


?>