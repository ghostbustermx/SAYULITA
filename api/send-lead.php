<?php
header('Content-Type: application/json');

$to = 'info@venadoblanco.com';
$subject = 'Nuevo lead - SayulitaTravel';

$name = isset($_POST['Nombre']) ? htmlspecialchars($_POST['Nombre'], ENT_QUOTES, 'UTF-8') : '';
$email = isset($_POST['Email']) ? filter_var($_POST['Email'], FILTER_SANITIZE_EMAIL) : '';
$phone = isset($_POST['Telefono']) ? htmlspecialchars($_POST['Telefono'], ENT_QUOTES, 'UTF-8') : '';
$propertyType = isset($_POST['Tipo de Propiedad']) ? htmlspecialchars($_POST['Tipo de Propiedad'], ENT_QUOTES, 'UTF-8') : '';
$message = isset($_POST['Mensaje']) ? htmlspecialchars($_POST['Mensaje'], ENT_QUOTES, 'UTF-8') : '';

if (empty($name) || empty($email)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Name and email are required']);
    exit;
}

$headers = "From: SayulitaTravel <info@venadoblanco.com>\r\n";
$headers .= "Reply-To: $name <$email>\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8\r\n";

$body = "<h2>Nuevo lead - SayulitaTravel</h2>";
$body .= "<table border='1' cellpadding='8' cellspacing='0' style='border-collapse:collapse;font-family:sans-serif;'>";
$body .= "<tr><td><strong>Nombre</strong></td><td>$name</td></tr>";
$body .= "<tr><td><strong>Email</strong></td><td>$email</td></tr>";
$body .= "<tr><td><strong>Teléfono</strong></td><td>$phone</td></tr>";
$body .= "<tr><td><strong>Tipo de Propiedad</strong></td><td>$propertyType</td></tr>";
$body .= "<tr><td><strong>Mensaje</strong></td><td>" . nl2br($message) . "</td></tr>";
$body .= "</table>";

if (mail($to, $subject, $body, $headers)) {
    echo json_encode(['success' => true]);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Mail could not be sent']);
}
