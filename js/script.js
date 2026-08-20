let listElement = document.querySelector("#app ul");
let inputElement = document.querySelector("#app input");
let buttonElement = document.querySelector("#app button");
let progressoBarra = document.querySelector("#progresso-barra");
let progressoTexto = document.querySelector("#progresso-texto");

let listaItens = JSON.parse(localStorage.getItem("@listaDeCompras")) || [];

listar();

function adicionar() {
  let item = inputElement.value.trim();

  if (item === "") {
    alert("Digite algum item");
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

function listar() {
  listElement.innerHTML = "";

  listaItens.forEach((i) => {
    let liElement = criarItem(i);

    listElement.appendChild(liElement);
  });

  atualizarProgresso();
}

buttonElement.onclick = adicionar;

inputElement.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    adicionar();
  }
});

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
    let novoNome = prompt("Editar item:", item.nome);

    if (novoNome === null) {
      return;
    }

    novoNome = novoNome.trim();

    if (novoNome === "") {
      alert("Digite algum item");
      return;
    }

    item.nome = novoNome;

    listar();
    salvarDados();
  });

  let excluir = document.createElement("button");
  excluir.textContent = "🗑️";

  excluir.addEventListener("click", () => {
    listaItens = listaItens.filter((i) => i.id !== item.id);

    listar();
    salvarDados();
  });

  divAcoes.appendChild(editar);
  divAcoes.appendChild(excluir);

  liElement.appendChild(checkBox);
  liElement.appendChild(itemText);
  liElement.appendChild(divAcoes);

  return liElement;
}

function atualizarProgresso() {
  let itensAusentes = listaItens.filter((i) => i.comprado === false);

  let progresso = 0;

  if (listaItens.length === 0) {
    progressoBarra.style.width = "0%";
    progressoTexto.textContent = "0%";
  } else {
    progresso = 1 - itensAusentes.length / listaItens.length;

    progresso = Number((progresso * 100).toFixed(0));

    progressoBarra.style.width = progresso + "%";
    progressoTexto.textContent = progresso + "%";
  }

  if (progresso === 100) {
    progressoBarra.classList.add("completo");
  } else {
    progressoBarra.classList.remove("completo");
  }
}

function salvarDados() {
  localStorage.setItem("@listaDeCompras", JSON.stringify(listaItens));
}
