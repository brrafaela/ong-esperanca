// validation.js
// Valida cada campo do formulário de cadastro individualmente,
// mostrando mensagens de erro específicas embaixo de cada um.

function initFormValidation() {
  const form = document.getElementById("form-cadastro");
  if (!form) return;

  const campos = form.querySelectorAll("input[required], textarea[required], select[required]");

  // Valida um campo em tempo real, assim que o usuário sai dele (evento "blur")
  campos.forEach((campo) => {
    campo.addEventListener("blur", () => validarCampo(campo));
    campo.addEventListener("input", () => {
      // se o campo já tinha erro e o usuário está corrigindo, reavalia na hora
      if (campo.classList.contains("campo-invalido")) {
        validarCampo(campo);
      }
    });
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    let formularioValido = true;
    campos.forEach((campo) => {
      const campoOk = validarCampo(campo);
      if (!campoOk) formularioValido = false;
    });

    if (formularioValido) {
      const dados = {
        nome: form.nome.value,
        email: form.email.value,
        cpf: form.cpf.value,
        participacao: form.participacao.value,
      };
      salvarCadastro(dados);
      mostrarFeedback("Cadastro enviado com sucesso!", "success");
      form.reset();
      campos.forEach((campo) => limparErro(campo));
    } else {
      mostrarFeedback("Corrija os campos destacados antes de enviar.", "error");
    }
  });
}

// Verifica um único campo e decide se mostra erro ou sucesso
function validarCampo(campo) {
  const valido = campo.checkValidity();

  if (valido) {
    limparErro(campo);
  } else {
    mostrarErro(campo);
  }

  return valido;
}

// Adiciona a borda vermelha e a mensagem de erro embaixo do campo
function mostrarErro(campo) {
  campo.classList.add("campo-invalido");

  let mensagem = campo.nextElementSibling;
  const jaTemMensagem = mensagem && mensagem.classList.contains("campo-erro-msg");

  if (!jaTemMensagem) {
    mensagem = document.createElement("small");
    mensagem.classList.add("campo-erro-msg");
    campo.insertAdjacentElement("afterend", mensagem);
  }

  mensagem.textContent = obterMensagemErro(campo);
}

// Remove a borda vermelha e a mensagem de erro, quando o campo já está correto
function limparErro(campo) {
  campo.classList.remove("campo-invalido");

  const mensagem = campo.nextElementSibling;
  if (mensagem && mensagem.classList.contains("campo-erro-msg")) {
    mensagem.remove();
  }
}

// Decide qual texto de erro mostrar, de acordo com o tipo de problema
function obterMensagemErro(campo) {
  if (campo.validity.valueMissing) {
    return "Este campo é obrigatório.";
  }
  if (campo.validity.typeMismatch && campo.type === "email") {
    return "Digite um e-mail válido, no formato nome@exemplo.com.";
  }
  if (campo.validity.patternMismatch && campo.id === "cpf") {
    return "Digite o CPF no formato 000.000.000-00.";
  }
  if (campo.validity.patternMismatch && campo.id === "telefone") {
    return "Digite o telefone no formato 11 99999-9999.";
  }
  if (campo.validity.patternMismatch && campo.id === "cep") {
    return "Digite o CEP no formato 00000-000.";
  }
  return "Verifique o valor digitado.";
}

// Mostra a mensagem geral de sucesso ou erro no topo do formulário
function mostrarFeedback(mensagem, tipo) {
  const area = document.getElementById("form-feedback");
  if (!area) return;

  area.innerHTML = `<div class="alert alert-${tipo}">${mensagem}</div>`;

  setTimeout(() => {
    area.innerHTML = "";
  }, 4000);
}