document.getElementById("login-form").addEventListener("submit", (event) => {
    event.preventDefault();
  
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
  
    // Validar usuario (puedes reemplazar esto con una validación real)
    if (username === "admin" && password === "1234") {
      // Guardar estado de sesión en localStorage
      localStorage.setItem("usuarioLogueado", "true");
      localStorage.setItem("nombreUsuario", username);
  
      // Redirigir a la tienda
      window.location.href = "tienda.html";
    } else {
      alert("Usuario o contraseña incorrectos");
    }
  });
  