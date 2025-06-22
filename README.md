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
   git clone https://github.com/marlonlacerda/task-manager-api && cd task-manager-api
    ```

2. Copie o arquivo de exemplo e configure as variáveis:
    ```bash
   cp .env.example .env
    ```

    Ajuste `.env` se necessário — o padrão está apontando para o MySQL no container de `docker-compose`:
    ```env
    DATABASE_URL="mysql://root:root@db:3306/taskmanager"
    JWT_SECRET=default_secret
    PORT=3000
    NODE_ENV=development
    ```

3. Inicie os containers com Docker Compose:
   ```bash
   docker-compose up -d
   ```

4. Acesso Swagger UI:

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

Ainda não foram implementados testes automatizados devido à falta de tempo. No entanto, a estrutura do projeto foi planejada para facilitar a adição de testes unitários e de integração no futuro. Recomenda-se o uso de bibliotecas como Jest ou Mocha para testes unitários e Supertest para testes de integração com as rotas da API.

---

## 📬 Contato

- Marlon Lacerda - Desenvolvedor Backend - [Linkedin](https://www.linkedin.com/in/marlonlacerda/)
- Para dúvidas: marlonlacerda.dev@gmail.com

___

## Conclusão
Este projeto cumpre os requisitos funcionais (auth, CRUD, filtros, docs Swagger) e não funcionais (TypeScript, SOLID, dockerização). O servidor pode ser levantado facilmente via Docker Compose e testado através da interface Swagger. Perfect checkout para avaliação técnica!
