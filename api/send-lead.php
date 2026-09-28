<?php
header('Content-Type: application/json');

$to = 'info@venadoblanco.com';
$subject = 'Nuevo lead - SayulitaTravel';

$businessName = isset($_POST['BusinessName']) ? htmlspecialchars($_POST['BusinessName'], ENT_QUOTES, 'UTF-8') : '';
$contactName = isset($_POST['ContactName']) ? htmlspecialchars($_POST['ContactName'], ENT_QUOTES, 'UTF-8') : '';
$phone = isset($_POST['Phone']) ? htmlspecialchars($_POST['Phone'], ENT_QUOTES, 'UTF-8') : '';
$email = isset($_POST['Email']) ? filter_var($_POST['Email'], FILTER_SANITIZE_EMAIL) : '';
$need = isset($_POST['Need']) ? htmlspecialchars($_POST['Need'], ENT_QUOTES, 'UTF-8') : '';

if (empty($businessName) || empty($contactName) || empty($phone) || empty($email) || empty($need)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'All fields are required']);
    exit;
}

$headers = "From: SayulitaTravel <info@venadoblanco.com>\r\n";
$headers .= "Reply-To: $contactName <$email>\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8\r\n";

$body = "<h2>Nuevo lead - SayulitaTravel</h2>";
$body .= "<table border='1' cellpadding='8' cellspacing='0' style='border-collapse:collapse;font-family:sans-serif;'>";
$body .= "<tr><td><strong>Nombre de empresa</strong></td><td>$businessName</td></tr>";
$body .= "<tr><td><strong>Nombre del contacto</strong></td><td>$contactName</td></tr>";
$body .= "<tr><td><strong>WhatsApp / teléfono</strong></td><td>$phone</td></tr>";
$body .= "<tr><td><strong>Email</strong></td><td>$email</td></tr>";
$body .= "<tr><td><strong>Necesidad aproximada</strong></td><td>" . nl2br($need) . "</td></tr>";
$body .= "</table>";

if (mail($to, $subject, $body, $headers)) {
    echo json_encode(['success' => true]);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Mail could not be sent']);
}
