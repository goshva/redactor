<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");

$dbHost = 'localhost';
$dbName = 'u0836920_newtender.one';
$dbUser = 'u0836920_newtt';
$dbPassword = '';

try {
    $pdo = new PDO("mysql:host=$dbHost;dbname=$dbName;charset=utf8", $dbUser, $dbPassword);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Could not connect to the database $dbName :" . $e->getMessage());
}
if (empty($_GET) && !empty($_POST)) {
    $sql = "SELECT id FROM croo_contents";
    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
    //$ids = array();
    //foreach ($results as $result) {
    //    $ids[] = $result['id'];
    //}
    echo json_encode($results);
}

elseif(isset($_GET['id'])){
    $id = $_GET['id'];
    $sql = "SELECT * FROM croo_contents WHERE id = $id LIMIT 1";
    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
    if (isset($results[0])) {
        echo json_encode($results[0]);
    } else {
	http_response_code(404); 
    	
    };

}

elseif(strtoupper($_SERVER['REQUEST_METHOD']) === 'POST') { 
    $var = json_decode(file_get_contents("php://input"),true);
    $sql = "UPDATE `croo_contents` SET ". $var["column"]." = :value WHERE `croo_contents`.`id` = :id;";
    $stmt = $pdo->prepare($sql);
    $stmt->bindValue(":value", $var["value"]);
    $stmt->bindValue(":id", $var["id"]);
    $stmt->execute();
    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($results);

}

else {
    $sql = "SELECT * FROM croo_contents LIMIT 1";
    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($results[0]);
	
}


