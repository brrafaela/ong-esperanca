// storage.js
// Responsável por guardar, ler e exibir os cadastros salvos no localStorage.

const STORAGE_KEY = "ong_esperanca_cadastros";

// Pega a lista de cadastros já salvos (ou uma lista vazia, se não houver nada ainda)
function getCadastros() {
  const dados = localStorage.getItem(STORAGE_KEY);
  return dados ? JSON.parse(dados) : [];
}

// Adiciona um novo cadastro à lista e salva de volta no localStorage
function salvarCadastro(cadastro) {
  const cadastros = getCadastros();
  cadastros.push(cadastro);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cadastros));
  renderizarCadastrosSalvos(); // atualiza a lista na tela assim que salva um novo
}

// Mostra na tela os cadastros que já estão salvos no localStorage
function renderizarCadastrosSalvos() {
  const lista = document.getElementById("lista-cadastros");
  if (!lista) return; // se não estamos na página de cadastro, não faz nada

  const cadastros = getCadastros();

  if (cadastros.length === 0) {
    lista.innerHTML = "<p>Nenhum cadastro salvo ainda neste navegador.</p>";
    return;
  }

  const itensHtml = cadastros
    .map((c) => `<li>${c.nome} — <span class="badge badge-secondary">${c.participacao}</span></li>`)
    .join("");

  lista.innerHTML = `
    <h3>Cadastros salvos neste navegador (${cadastros.length})</h3>
    <ul>${itensHtml}</ul>
  `;
}