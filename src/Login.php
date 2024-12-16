<?php
// Capturar datos del formulario
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $Login = $_POST['nombre']; // Obtener el valor del campo "nombre"
    echo "Hola,, " . htmlspecialchars($Login) . "!"; // Evitar ataques XSS con htmlspecialchars
} else {
    echo "Hola Bienvenido a Blueley.";
}
?>