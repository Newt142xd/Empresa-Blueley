const cart = []; // Array para almacenar productos
const cartItemsContainer = document.getElementById("cart-items");
const cartTotalElement = document.getElementById("cart-total");
const cartButton = document.querySelector(".cart-button");

// Función para agregar productos al carrito
function addToCartFromPage(button) {
  // Obtener datos del producto desde los atributos HTML
  const productElement = button.closest(".product");
  const productId = productElement.getAttribute("data-id");
  const productName = productElement.getAttribute("data-name");
  const productPrice = parseFloat(productElement.getAttribute("data-price"));

  // Buscar si el producto ya está en el carrito
  const existingProduct = cart.find((item) => item.id === productId);
  if (existingProduct) {
    existingProduct.quantity++;
  } else {
    cart.push({
      id: productId,
      name: productName,
      price: productPrice,
      quantity: 1,
    });
  }

  updateCart();
}

// Función para actualizar el carrito
function updateCart() {
  // Limpiar el contenedor actual
  cartItemsContainer.innerHTML = "";

  let total = 0;

  // Crear los elementos del carrito
  cart.forEach((item) => {
    total += item.price * item.quantity;

    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");
    cartItem.innerHTML = `
        <span>${item.name} (x${item.quantity})</span>
        <span>$${(item.price * item.quantity).toFixed(2)}</span>
      `;
    cartItemsContainer.appendChild(cartItem);
  });

  // Actualizar el total y el contador en el botón
  cartTotalElement.textContent = total.toFixed(2);
  cartButton.textContent = `Carrito (${cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  )})`;
}

function toggleCart() {
  const cartContainer = document.getElementById("cart");
  cartContainer.classList.toggle("open");
}

function removeFromCart(productId) {
  const productIndex = cart.findIndex((item) => item.id === productId);
  if (productIndex > -1) {
    cart.splice(productIndex, 1); // Elimina el producto del carrito
  }
  updateCart();
}

cartItem.innerHTML = `
  <span>${item.name} (x${item.quantity})</span>
  <span>$${(item.price * item.quantity).toFixed(2)}</span>
  <button onclick="removeFromCart('${item.id}')">Eliminar</button>
`;

// Guardar carrito en localStorage
function saveCartToLocalStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Cargar carrito desde localStorage
function loadCartFromLocalStorage() {
  const storedCart = localStorage.getItem("cart");
  if (storedCart) {
    const parsedCart = JSON.parse(storedCart);
    cart.push(...parsedCart);
    updateCart();
  }
}

// Llamar al cargar la página
loadCartFromLocalStorage();
