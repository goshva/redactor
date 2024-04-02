<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");

$dbHost = 'localhost';
$dbName = 'u0836920_newtender.one';
$dbUser = 'goshva';
$dbPassword = '';

try {
    $pdo = new PDO("mysql:host=$dbHost;dbname=$dbName;charset=utf8", $dbUser, $dbPassword);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Could not connect to the database $dbName :" . $e->getMessage());
}
if (empty($_GET)) {
    $sql = "SELECT id FROM croo_contents";
    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $ids = array();
    foreach ($results as $result) {
        $ids[] = $result['id'];
    }
    echo json_encode($ids);
}

elseif(isset($_GET['id'])){
    $id = $_GET['id'];
    $sql = "SELECT * FROM croo_contents WHERE id = $id LIMIT 1";
    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($results[0]);

} else {
    $sql = "SELECT * FROM croo_contents LIMIT 1";
    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($results[0]);
	
}


