<?php

declare(strict_types=1);

require_once __DIR__ . '/../vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;

header('Content-Type: application/json; charset=utf-8');

function respond(int $status, array $payload): void
{
    http_response_code($status);
    echo json_encode($payload);
    exit;
}

function envv(string $key, string $default = ''): string
{
    $value = $_ENV[$key] ?? $_SERVER[$key] ?? getenv($key);

    if ($value === false || $value === null) {
        return $default;
    }

    $value = trim((string) $value);

    return $value === '' ? $default : $value;
}

function esc(string $value): string
{
    return htmlspecialchars($value, ENT_QUOTES, 'UTF-8');
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    respond(405, ['success' => false, 'error' => 'Method not allowed']);
}

$businessName = trim((string) ($_POST['BusinessName'] ?? ''));
$contactName = trim((string) ($_POST['ContactName'] ?? ''));
$phone = trim((string) ($_POST['Phone'] ?? ''));
$email = trim((string) ($_POST['Email'] ?? ''));
$need = trim((string) ($_POST['Need'] ?? ''));

if ($businessName === '' || $contactName === '' || $phone === '' || $need === '') {
    respond(400, ['success' => false, 'error' => 'All fields are required']);
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(400, ['success' => false, 'error' => 'Invalid email address']);
}

$smtpHost = envv('SMTP_HOST');
$smtpUser = envv('SMTP_USER');
$smtpPass = envv('SMTP_PASS');
$smtpPort = (int) envv('SMTP_PORT', '465');
$smtpSecure = strtolower(envv('SMTP_SECURE', 'ssl'));
$fromEmail = envv('SMTP_FROM', $smtpUser);
$fromName = envv('SMTP_FROM_NAME', 'Sayulita Travel');
$to = 'info@sayulitatravel.com';

$missing = [];

foreach (['SMTP_HOST' => $smtpHost, 'SMTP_USER' => $smtpUser, 'SMTP_PASS' => $smtpPass] as $key => $value) {
    if ($value === '') {
        $missing[] = $key;
    }
}

if ($missing !== []) {
    error_log('send-lead: faltan variables de SMTP -> ' . implode(', ', $missing));
    respond(500, ['success' => false, 'error' => 'SMTP not configured']);
}

if (!filter_var($fromEmail, FILTER_VALIDATE_EMAIL) || !filter_var($to, FILTER_VALIDATE_EMAIL)) {
    error_log('send-lead: SMTP_FROM o el destinatario no son emails validos');
    respond(500, ['success' => false, 'error' => 'SMTP not configured']);
}

$rows = [
    'Nombre de empresa' => $businessName,
    'Nombre del contacto' => $contactName,
    'WhatsApp / telefono' => $phone,
    'Email' => $email,
    'Necesidad aproximada' => $need,
];

$html = '<h2>Nuevo lead - Sayulita Travel</h2>';
$html .= '<table cellpadding="8" cellspacing="0" style="border-collapse:collapse;font-family:sans-serif;font-size:14px">';

foreach ($rows as $label => $value) {
    $html .= '<tr><td style="border:1px solid #ddd"><strong>' . esc($label) . '</strong></td>';
    $html .= '<td style="border:1px solid #ddd">' . nl2br(esc($value)) . '</td></tr>';
}

$html .= '</table>';

$text = "Nuevo lead - Sayulita Travel\n\n";

foreach ($rows as $label => $value) {
    $text .= $label . ': ' . $value . "\n";
}

$mail = new PHPMailer(true);

try {
    $mail->isSMTP();
    $mail->Host = $smtpHost;
    $mail->Port = $smtpPort;
    $mail->CharSet = PHPMailer::CHARSET_UTF8;
    $mail->Timeout = 20;
    $mail->SMTPDebug = SMTP::DEBUG_OFF;

    $mail->SMTPSecure = ($smtpSecure === 'tls' || $smtpSecure === 'starttls')
        ? PHPMailer::ENCRYPTION_STARTTLS
        : PHPMailer::ENCRYPTION_SMTPS;

    $mail->SMTPAuth = true;
    $mail->Username = $smtpUser;
    $mail->Password = $smtpPass;

    $mail->setFrom($fromEmail, $fromName);
    $mail->addAddress($to);
    $mail->addReplyTo($email, $contactName);

    $mail->isHTML(true);
    $mail->Subject = 'Nuevo lead - Sayulita Travel';
    $mail->Body = $html;
    $mail->AltBody = $text;

    $mail->send();
} catch (Throwable $exception) {
    error_log('send-lead: fallo SMTP -> ' . $exception->getMessage());
    respond(500, ['success' => false, 'error' => 'Mail could not be sent']);
}

respond(200, ['success' => true]);
