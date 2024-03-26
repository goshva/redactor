
<?php

header('Content-Type: application/json');

// Database configuration
$dbHost = 'localhost';
$dbName = 'u0836920_newtender.one';
$dbUser = 'goshva';
$dbPassword = '';

// Create a PDO connection
try {
    $pdo = new PDO("mysql:host=$dbHost;dbname=$dbName;charset=utf8", $dbUser, $dbPassword);
    // Set the PDO error mode to exception
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Could not connect to the database $dbName :" . $e->getMessage());
}

// Prepare and execute the query
$sql = "SELECT * FROM croo_contents";
$stmt = $pdo->prepare($sql);
$stmt->execute();

// Fetch all results as an associative array
$results = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Encode the array to JSON and output the result
echo json_encode($results);
