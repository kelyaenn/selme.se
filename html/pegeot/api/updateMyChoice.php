<?php
require_once 'id.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");


$personId = $_GET['personId'];
$choiceId = $_GET['choiceId'];
$amount = $_GET['amount'];
$choice = $_GET['choice'];


$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    echo json_encode(array('success' => false));
    exit();
}
$sql = "UPDATE personChoice SET amount = '$amount', choice = '$choice' WHERE id_person = '$personId' AND id_choice = '$choiceId'";
$result = $conn->query($sql);

if ($result) {
    echo json_encode(array('success' => true));
    $conn->close();
    exit();
} else {
    echo json_encode(array('success' => false));
    $conn->close();
    exit();
}


?>