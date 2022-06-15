<h1 align="center">Store Manager</h1>

<div>
  <h2>Proposta do projeto.</h2>
  <p>Este projeto tem a finalidade de fazer um gerenciamento de dados através de requisições (POST, GET...) e manipular esses dados através de um banco de dados MySQL.</p>
</div>

---

## O usuário poderá:
 - Exeucutar um GET para trazer informações do banco;
 - Exeucutar um POST para adicionar informações do banco;
 - Exeucutar um PUT para atualizar informações do banco;
 - Exeucutar um DELETE para deletar informações do banco;

### Todas essas requisições são executadas em suas respectivas rotas.
### A aplicação é configurada para executar em `MySQL`, já que ela utiliza queries `MySQL`.

## Endpoints das requisições:
 - `/products`;
 - `/products/:id`;
 - `/sales`;
 - `/sales/:id`;
 
 ---

## Tecnologias utilizadas:
 - MySQL;
 - Docker;
 - Insomnia;
 - Arquitetura MSC;
 - Mocha, Sinon e Chai;

---

## Como rodar o projeto:
  1. Clone o repositório (método SSH) `git clone git@github.com:MateusCapitanio/StarWarsProject.git`;
  2. Execute `docker-compose up -d`;
  3. Execute `docker exec -it store_manager bash`;
  4. Execute `npm install`
