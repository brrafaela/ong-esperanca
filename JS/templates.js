// templates.js
// Guarda os dados e as funções que geram o HTML de cada "página" da SPA.

const projetosData = [
  {
    numero: "01",
    tag: "Segurança alimentar",
    titulo: "Alimentação Solidária",
    descricao: "Arrecadamos e distribuímos cestas básicas e refeições para famílias em situação de vulnerabilidade.",
  },
  {
    numero: "02",
    tag: "Aprendizado",
    titulo: "Educação",
    descricao: "Oferecemos apoio escolar, oficinas e incentivo à leitura para crianças e jovens da comunidade.",
  },
  {
    numero: "03",
    tag: "Mobilização",
    titulo: "Campanhas Sociais",
    descricao: "Realizamos campanhas de arrecadação e conscientização para responder às necessidades locais.",
  },
];

function criarCardProjeto(projeto) {
  return `
    <article class="project-card">
      <div class="project-icon" aria-hidden="true">${projeto.numero}</div>
      <div class="project-content">
        <p class="project-tag">${projeto.tag}</p>
        <h2>${projeto.titulo}</h2>
        <p>${projeto.descricao}</p>
        <a class="text-link" href="cadastro.html" data-route>Tenho interesse &rarr;</a>
      </div>
    </article>
  `;
}

// Cada função abaixo devolve o HTML da respectiva "página" da SPA.
// Por enquanto, servem de referência; o conteúdo completo de cada
// página já existe no próprio HTML de cada arquivo.
const templates = {
  criarCardProjeto,
  projetosData,
};