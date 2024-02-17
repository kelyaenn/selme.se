<?php



$entityBody = file_get_contents('php://input');
$body = json_decode($entityBody);

$teamId = $body->teamId;
$userId = $body->userId;
$apiKey = $body->apiKey;
    require_once 'id.php';
if (isset($teamId) && isset($userId)  && isset($apiKey) && $apiKey == $actualApiKey) {

    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        $success = false;
        echo json_encode(array('success' => $success));
        $conn->close();
        exit();
    }
    $sql = sprintf("INSERT INTO `teamUserLink` (`id_team`, `id_user`) VALUES ('%s', '%s')", $conn->real_escape_string($teamId), $conn->real_escape_string($userId));
    if ($conn->query($sql) === TRUE) {
        $sql = sprintf("DELETE FROM `teamInvite` WHERE teamId='%s' AND userId='%s'", $conn->real_escape_string($teamId), $conn->real_escape_string($userId));
        if ($conn->query($sql) === TRUE) {
            $success = true;
            echo json_encode(array('success' => $success));
            $conn->close();
            exit();
        } else {
            $success = false;
            echo json_encode(array('success' => $success));
            $conn->close();
            exit();
        }
    } else {
        $success = false;
        echo json_encode(array('success' => $success));
        $conn->close();
        exit();
    }
}

?>