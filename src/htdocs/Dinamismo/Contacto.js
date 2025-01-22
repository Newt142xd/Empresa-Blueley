// Seleccionar todos los botones de las cards
const toggleButtons = document.querySelectorAll(".toggle-btn");

// Agregar evento a cada botón
toggleButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Encontrar la descripción asociada al botón
    const cardDescription = button
      .closest(".card")
      .querySelector(".card-description");

    // Alternar visibilidad de la descripción
    if (cardDescription.style.display === "block") {
      cardDescription.style.display = "none";
      button.textContent = "Ver más"; // Cambiar texto del botón
    } else {
      cardDescription.style.display = "block";
      button.textContent = "Ver menos"; // Cambiar texto del botón
    }
  });
});
// Seleccionar botones y productos
const categoryButtons = document.querySelectorAll(".categories button");
const products = document.querySelectorAll(".product");

// Evento de clic para cada botón
categoryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Eliminar clase activa de todos los botones
    categoryButtons.forEach((btn) => btn.classList.remove("active"));
    // Añadir clase activa al botón clicado
    button.classList.add("active");

    // Filtrar productos
    const category = button.getAttribute("data-category");
    products.forEach((product) => {
      if (
        category === "all" ||
        product.getAttribute("data-category") === category
      ) {
        product.style.display = "block"; // Mostrar producto
      } else {
        product.style.display = "none"; // Ocultar producto
      }
    });
  });
});
