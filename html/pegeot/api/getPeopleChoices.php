<?php
require_once 'id.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");


$choiceId = $_GET['choiceId'];


$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    echo json_encode(array('success' => false));
    exit();
}
$sql = "SELECT personChoice.amount, personChoice.choice, people.name, choices.type FROM personChoice JOIN choices ON personChoice.id_choice = choices.id JOIN people ON people.id = personChoice.id_person WHERE choices.id = '$choiceId'";
$result = $conn->query($sql);

$response = array();
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $response[] = $row;
    }
    echo json_encode($response, JSON_UNESCAPED_UNICODE);
    $conn->close();
    exit();
} else {
    echo json_encode(array('success' => false));
    $conn->close();
    exit();
}


?>