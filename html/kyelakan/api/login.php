<?php



$entityBody = file_get_contents('php://input');
$body = json_decode($entityBody);


require_once 'id.php';


$apiKey = $body->apiKey;
$phone = $body->phone;
if (isset($phone) && isset($apiKey) && $apiKey == $actualApiKey) {
    $conn = new mysqli($servername, $username, $password, $dbname);
    if ($conn->connect_error) {
        $success = false;
        echo json_encode(array('success' => $success));
        $conn->close();
        exit();
    }


    $sql = sprintf("SELECT * FROM `users` WHERE `phone` = '%s'", $conn->real_escape_string($phone));
    $result = $conn->query($sql);
    if (!$result) {
        $success = false;
        echo json_encode(array('success' => $success));
        $conn->close();
        exit();
    }
    $rows = $result->num_rows;
    if ($rows == 1) {
        $success = true;
        $result->data_seek(0);
        $row = $result->fetch_array(MYSQLI_ASSOC);
        $id = $row['id'];
        echo json_encode(array('success' => $success, 'id' => $id));
        $conn->close();
        exit();
    }
    if ($rows > 1) {
        $success = false;
        echo json_encode(array('success' => $success));
        $conn->close();
        exit();
    }
    if ($rows == 0) {
        $sql = sprintf("INSERT INTO `users` (`phone`) VALUES ('%s')", $conn->real_escape_string($phone));
        if ($conn->query($sql) === TRUE) {
            $success = true;
            echo json_encode(array('success' => $success, 'id' => $conn->insert_id));
            $conn->close();
            exit();
        } else {
            $success = false;
            echo json_encode(array('success' => $success));
            $conn->close();
            exit();
        }
    }
    $conn->close();
    echo $rows;
} else {
    $success = false;
    echo json_encode(array('success' => $success));
    exit();
}

?>