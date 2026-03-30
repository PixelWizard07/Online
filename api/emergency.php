<?php
require __DIR__ . '/connection.php';

$hospital = trim($_POST['hospital'] ?? '');
$bloodGroup = strtoupper(trim($_POST['blood_group'] ?? ''));
$units = (int) ($_POST['units'] ?? 0);

$stmt = $pdo->prepare('INSERT INTO emergencies (hospital, blood_group, units) VALUES (:hospital, :blood_group, :units)');
$stmt->execute([
    'hospital' => $hospital,
    'blood_group' => $bloodGroup,
    'units' => $units,
]);

$payload = json_encode([
    'type' => 'emergency',
    'hospital' => $hospital,
    'blood_group' => $bloodGroup,
    'units' => $units,
]);
@file_put_contents('/tmp/blood_socket_queue.log', $payload . PHP_EOL, FILE_APPEND);

header('Location: /emergency.php?success=1');
