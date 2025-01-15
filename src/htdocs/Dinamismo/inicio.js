// Variables
const cart = [];
const cartItems = document.getElementById("cart-items");
const totalElement = document.getElementById("total");

// Función para añadir producto al carrito
document.querySelectorAll(".product button").forEach((button) => {
  button.addEventListener("click", () => {
    const product = button.parentElement;
    const id = product.getAttribute("data-id");
    const name = product.getAttribute("data-name");
    const price = parseFloat(product.getAttribute("data-price"));

    const existingProduct = cart.find((item) => item.id === id);

    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      cart.push({ id, name, price, quantity: 1 });
    }

    renderCart();
  });
});

// Función para renderizar el carrito
function renderCart() {
  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach((item) => {
    total += item.price * item.quantity;
    cartItems.innerHTML += `
              <li>${item.name} - ${item.quantity} x $${item.price.toFixed(
      2
    )}</li>
          `;
  });

  totalElement.textContent = total.toFixed(2);
}

const express = require("express");
const mysql = require("mysql");

const app = express();
const port = 3000;

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "tienda_online",
});

db.connect((err) => {
  if (err) {
    console.error("Error de conexión:", err);
  } else {
    console.log("Conectado a la base de datos.");
  }
});

// Ruta para obtener productos
app.get("/productos", (req, res) => {
  const sql = "SELECT * FROM productos";
  db.query(sql, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

fetch("http://localhost:3000/productos")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((producto) => {
      console.log(producto.nombre, producto.precio);
    });
  });

async function checkSession() {
    const token = localStorage.getItem('userToken');
    const loginBtn = document.querySelector('.Iniciar-sesion');
    const registerBtn = document.querySelector('.Registrarse');
    
    if (token) {
        try {
            const response = await fetch('http://localhost:5000/user-info', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await response.json();
            if (data.success) {
                // Ocultar botones de login y registro
                if (loginBtn) loginBtn.style.display = 'none';
                if (registerBtn) registerBtn.style.display = 'none';

                // Crear el contenedor del menú de usuario si no existe
                let userMenuContainer = document.querySelector('.user-menu');
                if (!userMenuContainer) {
                    userMenuContainer = document.createElement('div');
                    userMenuContainer.className = 'user-menu';
                }

                userMenuContainer.innerHTML = `
                    <div class="user-profile" id="userProfileBtn">
                        <img src="img/user-avatar.png" alt="Usuario" />
                        <span id="userName">${data.usuario.nombre}</span>
                    </div>
                    <div class="dropdown-menu" id="userDropdown">
                        <div class="user-info">
                            <strong>Nombre:</strong> <span id="fullName">${data.usuario.nombre} ${data.usuario.apellido}</span>
                        </div>
                        <div class="user-info">
                            <strong>Correo:</strong> <span id="userEmail">${data.usuario.correo}</span>
                        </div>
                        <div class="user-info">
                            <strong>Fecha de registro:</strong> <span id="registerDate">${new Date(data.usuario.fecha_registro).toLocaleDateString()}</span>
                        </div>
                        <div class="logout-btn" onclick="cerrarSesion()">Cerrar sesión</div>
                    </div>
                `;

                // Agregar el menú al DOM si no existe
                if (!document.querySelector('.user-menu')) {
                    document.body.appendChild(userMenuContainer);
                }

                // Configurar eventos del menú
                setupDropdownEvents();
                return true;
            } else {
                localStorage.removeItem('userToken');
                return false;
            }
        } catch (error) {
            console.error('Error:', error);
            localStorage.removeItem('userToken');
            return false;
        }
    }
    return false;
}

function setupDropdownEvents() {
    const userProfileBtn = document.getElementById('userProfileBtn');
    const userDropdown = document.getElementById('userDropdown');

    if (userProfileBtn && userDropdown) {
        userProfileBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            userDropdown.classList.toggle('active');
        });

        document.addEventListener('click', function(event) {
            const userMenu = document.querySelector('.user-menu');
            if (userMenu && !userMenu.contains(event.target)) {
                userDropdown.classList.remove('active');
            }
        });
    }
}

async function cerrarSesion() {
    const token = localStorage.getItem('userToken');
    try {
        const response = await fetch('http://localhost:5000/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token })
        });

        const data = await response.json();
        if (data.success) {
            localStorage.removeItem('userToken');
            window.location.href = 'index.html';
        }
    } catch (error) {
        console.error('Error al cerrar sesión:', error);
    }
}

// Ejecutar checkSession cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    checkSession();
});
