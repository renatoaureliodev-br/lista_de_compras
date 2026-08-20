const listElement = document.querySelector("#app ul");
const inputElement = document.querySelector("#app input");
const adicionarElement = document.querySelector("#adicionar-item");
const limparElement = document.querySelector("#limpar-lista");
const progressoBarra = document.querySelector("#progresso-barra");
const progressoTexto = document.querySelector("#progresso-texto");
const mensagensElement = document.querySelector("#mensagens");

let listaItens = JSON.parse(localStorage.getItem("@listaDeCompras")) || [];

listar();

// ==============================
// ADICIONAR ITEM
// ==============================

function adicionar() {
  let item = inputElement.value.trim();

  if (item === "") {
    mostrarMensagem("Digite algum item", "erro");
    inputElement.focus();
    return;
  }

  let itemExiste = listaItens.some(
    (i) => i.nome.toLowerCase() === item.toLowerCase(),
  );

  if (itemExiste) {
    mostrarMensagem("Item já existe", "aviso");
    inputElement.focus();
    return;
  }

  listaItens.push({
    id: Date.now(),
    nome: item,
    comprado: false,
  });

  inputElement.value = "";
  inputElement.focus();

  listar();
  salvarDados();
}

// ==============================
// LIMPAR LISTA
// ==============================

function limparLista() {
  let confirmar = confirm("Tem certeza que deseja limpar toda a lista?");

  if (!confirmar) {
    return;
  }

  listaItens = [];

  listar();
  salvarDados();

  inputElement.focus();

  mostrarMensagem("Lista limpa com sucesso", "sucesso");
}

// ==============================
// LISTAR ITENS
// ==============================

function listar() {
  listElement.innerHTML = "";

  listaItens.forEach((item) => {
    let liElement = criarItem(item);

    listElement.appendChild(liElement);
  });

  atualizarProgresso();
}

// ==============================
// CRIAR ITEM
// ==============================

function criarItem(item) {
  let liElement = document.createElement("li");

  let checkBox = document.createElement("input");
  checkBox.type = "checkbox";
  checkBox.checked = item.comprado;

  let itemText = document.createElement("span");
  itemText.textContent = item.nome;
  itemText.className = "texto-item";

  if (item.comprado) {
    itemText.classList.add("texto-riscado");
  }

  checkBox.addEventListener("change", () => {
    item.comprado = checkBox.checked;

    itemText.classList.toggle("texto-riscado", item.comprado);

    atualizarProgresso();
    salvarDados();
  });

  let divAcoes = document.createElement("div");
  divAcoes.className = "acoes";

  let editar = document.createElement("button");
  editar.textContent = "✏️";

  editar.addEventListener("click", () => {
    editarItem(item);
  });

  let excluir = document.createElement("button");
  excluir.textContent = "🗑️";

  excluir.addEventListener("click", () => {
    excluirItem(item);
  });

  divAcoes.appendChild(editar);
  divAcoes.appendChild(excluir);

  liElement.appendChild(checkBox);
  liElement.appendChild(itemText);
  liElement.appendChild(divAcoes);

  return liElement;
}

// ==============================
// EDITAR ITEM
// ==============================

function editarItem(item) {
  let novoNome = prompt("Editar item:", item.nome);

  if (novoNome === null) {
    return;
  }

  novoNome = novoNome.trim();

  if (novoNome === "") {
    mostrarMensagem("Digite algum item", "erro");
    return;
  }

  let itemExiste = listaItens.some(
    (i) => i.id !== item.id && i.nome.toLowerCase() === novoNome.toLowerCase(),
  );

  if (itemExiste) {
    mostrarMensagem("Já existe um item com esse nome", "aviso");
    return;
  }

  item.nome = novoNome;

  listar();
  salvarDados();
}

// ==============================
// EXCLUIR ITEM
// ==============================

function excluirItem(item) {
  listaItens = listaItens.filter((i) => i.id !== item.id);

  listar();
  salvarDados();
}

// ==============================
// ATUALIZAR PROGRESSO
// ==============================

function atualizarProgresso() {
  let itensAusentes = listaItens.filter((i) => i.comprado === false);

  let progresso = 0;

  if (listaItens.length > 0) {
    progresso = 1 - itensAusentes.length / listaItens.length;

    progresso = Number((progresso * 100).toFixed(0));
  }

  progressoBarra.style.width = progresso + "%";

  progressoTexto.textContent = progresso + "%";

  progressoBarra.classList.toggle("completo", progresso === 100);
}

// ==============================
// LOCAL STORAGE
// ==============================

function salvarDados() {
  localStorage.setItem("@listaDeCompras", JSON.stringify(listaItens));
}

// ==============================
// MENSAGENS
// ==============================

function mostrarMensagem(mensagem, tipo = "erro") {
  let mensagemElement = document.createElement("div");

  let icones = {
    erro: "❌",
    sucesso: "✅",
    aviso: "⚠️",
  };

  mensagemElement.className = `mensagem ${tipo}`;

  mensagemElement.textContent = `${icones[tipo]} ${mensagem}`;

  mensagensElement.appendChild(mensagemElement);

  setTimeout(() => {
    mensagemElement.remove();
  }, 3000);
}

// ==============================
// EVENTOS
// ==============================

adicionarElement.addEventListener("click", adicionar);

limparElement.addEventListener("click", limparLista);

inputElement.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    adicionar();
  }
});
