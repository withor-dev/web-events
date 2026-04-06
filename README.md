# 📅 Web Events - Plataforma de Gestão de Eventos

Uma aplicação Fullstack moderna para gerenciamento de eventos e inscrições de participantes, desenvolvida com foco em **arquitetura**, **performance** e **boas práticas de código**.

## 🚀 Tecnologias e Versões

Este projeto utiliza o que há de mais moderno no ecossistema JavaScript/TypeScript:

**Back-end:**

- **Node.js** (v24+)
- **Express.js** (v5.2) - _Aproveitando suporte nativo a Promises para tratamento de erros sem blocos try/catch massivos._
- **Prisma ORM** (v7) - _Utilizando o novo adapter nativo (`pg`) para maior performance e menor consumo de memória._
- **PostgreSQL** (via Docker)
- **Zod** - _Validação de schemas e geração dinâmica de DTOs._

**Front-end:**

- **Next.js** (v16.2) - _Utilizando o App Router com forte separação entre Server Components e Client Components._
- **React** (v19)
- **Tailwind CSS** (v4.2)
- **Axios**

---

## 🧠 Arquitetura e Boas Práticas

- **Separação de Responsabilidades:** O back-end segue o padrão de camadas (Routes $\rightarrow$ Controllers $\rightarrow$ Services), garantindo o Princípio de Responsabilidade Única (SOLID).
- **Tipagem Estrita (Generics):** Uso avançado de TypeScript no Express para tipar `Request` (ex: `Request<EventParams>`), prevenindo erros em tempo de compilação.
- **Tratamento Global de Erros:** Middleware centralizado no Express para capturar erros de validação do Zod e conflitos do Prisma de forma padronizada.
- **Server-Side Rendering (SSR):** No Next.js, as listagens e detalhes buscam dados diretamente no servidor, entregando o HTML pronto para o navegador (SEO e Performance).
- **Micro-componentização:** Interatividades do cliente (como botões de exclusão e formulários) foram isoladas em Client Components (`"use client"`), mantendo a árvore principal como Server Components.
- **DRY (Don't Repeat Yourself):** Formulários de Criação e Edição compartilham o mesmo componente base.

---

## 📋 Funcionalidades (Full CRUD)

- **Eventos:** Criar, listar, visualizar detalhes, editar e excluir.
- **Participantes:** Cadastrar, listar inscritos por evento, editar dados e remover inscrições.
- **Regra de Negócio:** Deleção em cascata (excluir um evento apaga suas inscrições) e prevenção de inscrições duplicadas no mesmo evento (via chave primária composta no banco).

---

## 🛠️ Como executar o projeto localmente

### 1. Pré-requisitos

- Node.js v24+
- Docker e Docker Compose

### 2. Setup do Banco de Dados

Na pasta `backend`, inicie o contêiner do PostgreSQL:

```bash
cd backend
docker-compose up -d
```

### 3. Configurando as Variáveis de Ambiente

- No Back-end (/backend) e Front-end (/frontend), copie o arquivo de exemplo:

```text
cp .env.example .env
```

### 4. Rodando o Back-end

```bash
cd backend
npm install
npx prisma generate
npx prisma migrate dev  # Cria as tabelas no banco de dados
npm run dev             # Inicia a API na porta 3000
```

### 5. Rodando o Front-end

```bash
cd frontend
npm install
npm run dev             # Inicia o Next.js na porta 3000
```

_Acesse http://localhost:3001 no seu navegador para utilizar a aplicação._
