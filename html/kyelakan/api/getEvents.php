<?php



$entityBody = file_get_contents('php://input');
$body = json_decode($entityBody);

$id = $body->id;
$teams = $body->teams;
$apiKey = $body->apiKey;


require_once 'id.php';
if(isset($teams) && isset($id) && isset($apiKey) && $apiKey == $actualApiKey){

$conn = new mysqli($servername, $username, $password,$dbname);

if($conn->connect_error)
{
    $success = false;
    echo json_encode(array('success' => $success));
    exit();
}
     $sql = sprintf("(SELECT * FROM `events` WHERE teamId IN (%s) AND restrictedGuests=0) UNION (SELECT events.id,day, isAllDay, timeStart, timeEnd, price, place, creatorId, teamId, description, name, restrictedGuests from `guestsLink` INNER JOIN `events` ON guestsLink.eventId = events.id WHERE guestsLink.userId = %s)",$conn->real_escape_string( $teams),$conn->real_escape_string($id));
         
$result = $conn->query($sql);
if(!$result)
{
    $success = false;
    echo json_encode(array('success' => $success));
$conn->close();
    exit();
}   
$rows = $result->num_rows;
$Array = [];
for ($j=0;$j<$rows;$j++){
    $result->data_seek($j);
    $row=$result->fetch_array(MYSQLI_ASSOC);
    $Array[] = $row;
  }

$conn->close();
echo json_encode($Array, JSON_NUMERIC_CHECK);
exit(); 
}else{
    $success = false;
    echo json_encode(array('success' => $success));
    exit();
}

?>