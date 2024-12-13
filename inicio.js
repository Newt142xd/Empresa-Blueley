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
