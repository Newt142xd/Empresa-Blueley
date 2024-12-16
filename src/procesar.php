<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['accion'])) {
    $accion = $_POST['accion'];

    if ($accion === 'guardar') {
        $mensaje = "Datos guardados correctamente.";
    } elseif ($accion === 'eliminar') {
        $mensaje = "Datos eliminados correctamente.";
    } else {
        $mensaje = "Acción no reconocida.";
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Ejemplo con PHP</title>
</head>
<body>
  <form method="POST">
    <button type="submit" name="accion" value="guardar">Guardar</button>
    <button type="submit" name="accion" value="eliminar">Eliminar</button>
  </form>

  <?php if (isset($mensaje)): ?>
    <p><?php echo $mensaje; ?></p>
  <?php endif; ?>
</body>
</html>