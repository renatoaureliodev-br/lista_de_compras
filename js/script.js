let listElement = document.querySelector("#app ul");
let inputElement = document.querySelector("#app input");
let buttonElement = document.querySelector("#app button");
let progressoBarra = document.querySelector("#progresso-barra");
let progressoTexto = document.querySelector("#progresso-texto");

let listaItens = [];

function adicionar() {
  if (inputElement.value === "") {
    alert("Digite algum item");
    return false;
  } else {
    let item = inputElement.value;

    listaItens.push({
      id: Date.now(),
      nome: item,
      comprado: false,
    });
    inputElement.value = "";
    listar();
  }
}

function listar() {
  listElement.innerHTML = "";

  listaItens.map((i) => {
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

  checkBox.addEventListener("change", () => {
    item.comprado = checkBox.checked;

    itemText.classList.toggle("texto-riscado");

    atualizarProgresso();
  });

  let itemText = document.createElement("span");
  itemText.textContent = item.nome;
  itemText.className = "texto-item";

  let divAcoes = document.createElement("div");
  divAcoes.className = "acoes";

  let editar = document.createElement("button");
  editar.textContent = "✏️";
  editar.addEventListener("click", () => {
    let novoNome = prompt("Editar item:", item.nome);

    item.nome = novoNome;
    listar();
  });

  let excluir = document.createElement("button");
  excluir.textContent = "🗑️";
  excluir.addEventListener("click", () => {
    listaItens = listaItens.filter((i) => i.id !== item.id);
    listar();
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
  }
}
