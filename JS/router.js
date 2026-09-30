// router.js
// Intercepta os cliques nos links do menu, evitando o recarregamento
// completo da página sempre que possível.

function interceptNavigation() {
  document.body.addEventListener("click", function (event) {
    const link = event.target.closest("a");
    if (!link) return;

    const href = link.getAttribute("href");
    const isInternalPage =
      href && (href === "index.html" || href === "projetos.html" || href === "cadastro.html");

    if (isInternalPage) {
      // Aqui deixamos o navegador seguir o link normalmente por enquanto,
      // já que cada página ainda é um arquivo HTML separado.
      // updateActiveLink cuida só da parte visual do menu.
      updateActiveLink(href);
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const paginaAtual = window.location.pathname.split("/").pop() || "index.html";
  updateActiveLink(paginaAtual);
  interceptNavigation();
});