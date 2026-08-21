# 🛒 Lista de Compras

Aplicação web responsiva para gerenciamento de listas de compras, desenvolvida com HTML, CSS e JavaScript.

O projeto foi criado como um projeto prático de estudo e evolução em desenvolvimento web front-end, com implementação gradual de funcionalidades e boas práticas de programação.

## 🚀 Aplicação online

A aplicação está disponível para acesso:

👉 **[Lista de Compras](https://lista-de-compras-tawny.vercel.app/)**

## 📋 Sobre o projeto

A aplicação permite criar e gerenciar uma lista de compras de forma simples e visual.

O projeto está sendo desenvolvido de forma incremental, utilizando JavaScript para praticar conceitos como:

- Manipulação do DOM
- Eventos
- Arrays e objetos
- Funções
- Validação de dados
- Armazenamento local
- Atualização dinâmica da interface
- Regras de negócio

O objetivo é evoluir a aplicação por meio de pequenas milestones, utilizando Git e GitHub para acompanhar o desenvolvimento.

## ✨ Funcionalidades

- [x] Adicionar itens à lista
- [x] Adicionar itens pressionando `Enter`
- [x] Marcar itens como comprados
- [x] Riscar itens comprados
- [x] Editar itens
- [x] Excluir itens
- [x] Barra de progresso das compras
- [x] Animação ao completar a lista
- [x] Persistência dos dados utilizando Local Storage
- [x] Impedir adição de itens duplicados
- [x] Validar itens durante a edição
- [x] Melhorar tratamento de entradas inválidas
- [ ] Reorganizar itens comprados para o final da lista

## 💾 Persistência dos dados

Os itens da lista são armazenados no `Local Storage` do navegador.

Dessa forma, os dados permanecem disponíveis mesmo após:

- Recarregar a página
- Fechar e abrir novamente o navegador

Os dados são armazenados em formato JSON.

> A persistência é local ao navegador e ao dispositivo utilizado. Os dados não são armazenados em um servidor.

## 🛠️ Tecnologias

- HTML5
- CSS3
- JavaScript
- Local Storage
- Vercel

## 📱 Responsividade

A aplicação foi desenvolvida para funcionar em diferentes tamanhos de tela, incluindo:

- Computadores
- Tablets
- Celulares

## 🗺️ Roadmap

O desenvolvimento está dividido em milestones para facilitar a evolução gradual do projeto.

### Milestone 1 — MVP da Lista de Compras

**Objetivo:** consolidar a versão inicial funcional.

- Adição de itens
- Edição
- Exclusão
- Marcação de itens comprados
- Barra de progresso
- Interface responsiva

**Status:** ✅ Concluída

---

### Milestone 2 — Persistência dos dados

**Objetivo:** fazer a lista sobreviver ao fechamento e recarregamento da página.

- Implementação do Local Storage
- Recuperação dos dados ao iniciar a aplicação
- Salvamento das alterações

**Status:** ✅ Concluída

---

### Milestone 3 — Validação e integridade da lista

**Objetivo:** impedir dados inválidos ou duplicados e tornar o comportamento da lista mais consistente.

- [x] Impedir adição de itens duplicados
- [x] Considerar diferenças entre maiúsculas e minúsculas
- [x] Validar edição de itens
- [x] Impedir itens vazios ou contendo apenas espaços
- [x] Testar as validações junto com a persistência

**Status:** 🚧 Em desenvolvimento

---

### Próximas etapas

- [ ] Reorganizar itens comprados para o final da lista
- [ ] Criar uma nova lista após concluir as compras
- [ ] Melhorar experiência de usuário
- [ ] Criar estados visuais para lista vazia, carregamento e erros
- [ ] Evoluir a identidade visual do aplicativo
- [ ] Avaliar novas funcionalidades

## 📂 Estrutura do projeto

```text
lista-de-compras/
│
├── index.html
├── README.md
├── LICENSE
│
├── css/
│   └── style.css
│
├── js/
│   └── script.js
│
└── img/
    ├── logo_app_lista_de_compras.png
    └── erro.png
