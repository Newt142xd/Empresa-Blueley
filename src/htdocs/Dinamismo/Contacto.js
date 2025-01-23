// Elementos del DOM
const hamburgerBtn = document.getElementById("hamburger-btn");
const closeBtn = document.getElementById("close-btn");
const sidebar = document.getElementById("sidebar");
const submenuLinks = document.querySelectorAll(".menu > li > a");

// Abrir el sidebar
hamburgerBtn.addEventListener("click", () => {
  sidebar.classList.add("open");
});

// Cerrar el sidebar
closeBtn.addEventListener("click", () => {
  sidebar.classList.remove("open");
});

// Alternar submenús
submenuLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const submenu = link.nextElementSibling;
    if (submenu && submenu.classList.contains("submenu")) {
      submenu.style.display =
        submenu.style.display === "block" ? "none" : "block";
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
