# 🚀 Task Manager API

API para controle de tarefas com autenticação via JWT, CRUD de tarefas e documentação Swagger.

---

## 📋 Índice

- [🚀 Task Manager API](#-task-manager-api)
  - [📋 Índice](#-índice)
  - [📝 Descrição](#-descrição)
  - [✅ Funcionalidades](#-funcionalidades)
  - [⚙️ Pré-requisitos](#️-pré-requisitos)
  - [📦 Instalação \& Execução](#-instalação--execução)
  - [🛠️ Estrutura do Projeto](#️-estrutura-do-projeto)
    - [Organização explicada:](#organização-explicada)
  - [🧰 Ferramentas \& Tecnologias](#-ferramentas--tecnologias)
  - [🧪 Testes](#-testes)
  - [📬 Contato](#-contato)
  - [Conclusão](#conclusão)

---

## 📝 Descrição

Desenvolvimento de uma API para controle de tarefas, com autenticação via JWT e operações CRUD. Atende aos requisitos de registro/login de usuário, gerenciamento de tarefas (título, descrição, status e vencimento), filtragem e ordenação. Planejado com princípios SOLID e código bem documentado.

---

## ✅ Funcionalidades

- Autenticação: registro e login com JWT  
- CRUD de Tarefas: criação, leitura, atualização e exclusão  
- Filtros e Ordenação: por status e data de vencimento  
- Documentação interativa via Swagger UI  

---

## ⚙️ Pré-requisitos

- Docker & Docker Compose  
- Git  
- Node.js ≥20 (para rodar localmente, se optar por não usar Docker)

---

## 📦 Instalação & Execução

1. Clone o repositório:
   ```bash
   git clone https://github.com/marlondlacerda/task-manager-api && cd task-manager-api
    ```

2. Copie o arquivo de exemplo e configure as variáveis:
    ```bash
   cp .env.example .env
    ```
    Edite o `.env` para refletir o host do seu MySQL. Exemplo de configuração para MySQL local:
    ```env
    DATABASE_URL="mysql://root:root@localhost:3306/taskmanager"
    JWT_SECRET=default_secret
    PORT=3000
    NODE_ENV=development
    ```
    📌 Se você usar Docker para o banco, use `172.17.0.1` no lugar de `localhost`, no DATABASE_URL, para o app conseguir enxergar o banco de fora do container.

3. Suba um banco MySQL

    Você pode usar o MySQL localmente ou rodar um container com Docker:
    ```bash
   docker run --name mysql-taskmanager -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=taskmanager -p 3306:3306 -d mysql:8
    ```
    ⚠️ Atenção: o MySQL precisa estar rodando antes de subir o app — o Prisma vai tentar aplicar as migrations na inicialização. Se o banco não estiver acessível, o container do app irá falhar.

4. Construa e execute o app com Docker
   ```bash
   docker build -t taskmanager-app . \
   && docker run -d --name taskmanager-container \
   --env-file .env \
   -p 3000:3000 \
   taskmanager-app
   ```

5. Aplique as migrations do Prisma:

    Se você estiver rodando o app via Docker, execute o comando abaixo para aplicar as migrations:
    ```bash
   docker exec -it taskmanager-container sh -c "export DATABASE_URL='mysql://root:root@172.17.0.1:3306/taskmanager' && npm run prisma:migrate"
    ```
    Se estiver rodando localmente, use:
    ```bash
    npm run prisma:migrate
    ```
    ⚠️ Atenção: Certifique-se de estar usando o mesmo `DATABASE_URL` que você configurou no `.env` com o host correto do MySQL.

6. Acesso Swagger UI:

    🚀 Quando tudo estiver no ar, acesse:
    ```bash
    http://localhost:3000/swagger
    ```
    A partir daí, você pode testar as rotas da API diretamente pela interface Swagger.

---

## 🛠️ Estrutura do Projeto

Exemplo de organização gerada a partir da árvore do projeto:
```plaintext
src
├── domain
│   ├── entities
│   ├── repositories
│   └── usecases
│       ├── auth
│       └── task
├── infra
│   ├── database
│   │   ├── mongodb
│   │   └── mysql
│   └── repositories
├── main
│   ├── config
│   ├── factories
│   ├── middleware
│   ├── routes
│   │   ├── auth
│   │   └── task
│   └── validations
├── presentation
│   ├── controllers
│   ├── docs
│   │   ├── schemas
│   │   └── swagger
│   └── helpers
└── shared
    ├── auth
    ├── errors
    └── logging
```

### Organização explicada:

  - domain: regras de negócio, entidades, repositórios e casos de uso.
  - infra: implementações de infraestrutura (MySQL, MongoDB, repositórios).
  - main: configuração do servidor, rotas, middlewares e validações.
  - presentation: controllers HTTP, documentação Swagger, helpers.
  - shared: autenticação, tratamento de erros e logging.

---

## 🧰 Ferramentas & Tecnologias

- Node.js
- TypeScript
- Prisma (MySQL)
- Express
- TSOA + Swagger UI
- Docker + Docker Compose
- JWT, bcrypt, helmet, winston, zod, entre outros.
___

## 🧪 Testes
Devido à limitação de tempo, foram implementados testes básicos utilizando Jest. Os testes cobrem as principais funcionalidades da API, como autenticação e operações CRUD de tarefas. 
___

## 📬 Contato

- Marlon Lacerda - Desenvolvedor Backend - [Linkedin](https://www.linkedin.com/in/marlonlacerda/)
- Para dúvidas: marlonlacerda.dev@gmail.com

___

## Conclusão
Este projeto cumpre os requisitos funcionais (auth, CRUD, filtros, docs Swagger) e não funcionais (TypeScript, SOLID, dockerização). O servidor pode ser levantado facilmente via Docker Compose e testado através da interface Swagger. Perfect checkout para avaliação técnica!
