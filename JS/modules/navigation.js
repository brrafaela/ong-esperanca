// navigation.js
// Responsável só pela parte visual do menu: marcar o link ativo.

function updateActiveLink(path) {
  document.querySelectorAll(".menu a").forEach((link) => {
    const linkPath = link.getAttribute("href");
    link.classList.toggle("active", linkPath === path);
  });
}