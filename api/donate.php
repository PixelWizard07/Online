<?php
require __DIR__ . '/connection.php';

$stmt = $pdo->prepare('INSERT INTO donors (name, blood_group, phone) VALUES (:name, :blood_group, :phone)');
$stmt->execute([
    'name' => $_POST['name'] ?? '',
    'blood_group' => strtoupper(trim($_POST['blood_group'] ?? '')),
    'phone' => $_POST['phone'] ?? '',
]);
header('Location: /donate.php?success=1');
