// Verificación de sesión
function verificarSesionActiva() {
  const usuarioLogueado = localStorage.getItem("usuarioLogueado");



// Llama a la función de verificación al cargar la página
document.addEventListener("DOMContentLoaded", verificarSesionActiva);

// Carrito de compras
const cart = [];
const cartItems = document.querySelector(".container-cart-products");
const totalElement = document.querySelector(".total-pagar");
const contadorProductos = document.getElementById("contador-productos");

document.querySelectorAll(".btn-add-cart").forEach((button) => {
  button.addEventListener("click", () => {
    const id = button.getAttribute("data-id");
    const name = button.getAttribute("data-name");
    const price = parseFloat(button.getAttribute("data-price"));

    const existingProduct = cart.find((item) => item.id === id);
    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      cart.push({ id, name, price, quantity: 1 });
    }

    renderCart();
  });
});

function renderCart() {
  cartItems.innerHTML = "";
  let total = 0;
  let count = 0;

  cart.forEach((item) => {
    total += item.price * item.quantity;
    count += item.quantity;

    cartItems.innerHTML += `
      <div class="cart-product">
        <div class="info-cart-product">
          <span>${item.quantity}</span>
          <p>${item.name}</p>
          <span>$${item.price.toFixed(2)}</span>
        </div>
      </div>
    `;
  });

  totalElement.textContent = `$${total.toFixed(2)}`;
  contadorProductos.textContent = count;

  if (cart.length === 0) {
    cartItems.innerHTML = `<p class="cart-empty">El carrito está vacío</p>`;
  }
}

// Función para verificar sesión al cargar la tienda
function verificarSesionActiva() {
  const usuarioLogueado = localStorage.getItem("usuarioLogueado");

  if (usuarioLogueado !== "true") {
    alert("Por favor, inicia sesión para acceder a esta página.");
    window.location.href = "login.html"; // Redirige al login si no hay sesión activa
  }
}

// Llama la función de verificación de sesión cuando la página se carga
document.addEventListener("DOMContentLoaded", verificarSesionActiva);
