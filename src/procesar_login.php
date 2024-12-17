<?php
// Iniciar sesión en el servidor
session_start();

// Datos de usuario válidos para este ejemplo
$usuario_valido = "admin";
$password_valido = "12345";

// Verificar si los datos fueron enviados
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Validar las credenciales
    if ($username === $usuario_valido && $password === $password_valido) {
        // Guardar datos en la sesión
        $_SESSION['usuario'] = $username;
        // Redirigir a la página principal
        header("Location: dashboard.php");
        exit();
    } else {
        echo "Usuario o contraseña incorrectos.";
    }
} else {
    echo "Acceso no válido.";
}
?>

<?php
session_start();

// Verificar si el usuario ha iniciado sesión
if (isset($_SESSION['usuario'])) {
    echo "¡Bienvenido, " . $_SESSION['usuario'] . "!";
    echo '<br><a href="logout.php">Cerrar sesión</a>';
} else {
    // Redirigir al login si no está autenticado
    header("Location: index.html");
    exit();
}
?>


<?php
session_start();
session_destroy(); // Cierra la sesión actual
header("Location: index.html"); // Redirigir al inicio
exit();
?>
