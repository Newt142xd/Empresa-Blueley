<?php
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $usuario = $_POST['usuario'];
    $password = $_POST['password'];

    $usuario_valido = "admin";
    $password_valido = "12345";

    if ($usuario === $usuario_valido && $password === $password_valido) {
        $_SESSION['usuario'] = $usuario; // Guardar usuario en la sesión
        header("Location: bienvenida.php");
        exit();
    } else {
        echo "Usuario o contraseña incorrectos.";
    }
} else {
    echo "Acceso no válido.";
}
?>

<?php


if (isset($_SESSION['usuario'])) {
    echo "¡Bienvenido, " . $_SESSION['usuario'] . "!";
    echo '<br><a href="logout.php">Cerrar sesión</a>';
} else {
    echo "Por favor, inicia sesión.";
}
?>