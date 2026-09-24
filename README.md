# DevShowcase API

API REST desenvolvida para gerenciar perfis profissionais, projetos, tecnologias e feedbacks.

## Tecnologias utilizadas

- Node.js
- Express
- Prisma ORM
- SQLite
- Zod
- Postman

## Arquitetura

O projeto está organizado em camadas:

- **Controller:** recebe as requisições e envia as respostas.
- **Service:** aplica as regras de negócio.
- **Repository:** realiza as operações no banco de dados.
- **DTO:** valida e organiza os dados de entrada e saída.
- **Routes:** define as rotas da API.

## Entidades

- Profile
- Project
- Technology
- Feedback

## Relacionamentos

- Um perfil pode possuir vários projetos.
- Um projeto pode utilizar várias tecnologias.
- Uma tecnologia pode estar em vários projetos.
- Um projeto pode receber vários feedbacks.

## Endpoints

| Método | Endpoint | Descrição |
|---|---|---|
| POST | `/api/profiles` | Cadastra um perfil |
| GET | `/api/profiles/:id` | Busca um perfil pelo ID |
| POST | `/api/technologies` | Cadastra uma tecnologia |
| GET | `/api/technologies` | Lista as tecnologias |
| POST | `/api/projects` | Cadastra um projeto |
| GET | `/api/projects` | Lista os projetos |

## Como executar

Clone o repositório e instale as dependências:

```bash
npm install
```

Crie um arquivo `.env` seguindo o exemplo disponível em `.env.example`.

Execute as migrações:

```bash
npx prisma migrate dev
```

Gere o Prisma Client:

```bash
npx prisma generate
```

Inicie a aplicação:

```bash
npm run dev
```

A API ficará disponível em:

```text
http://localhost:3000
```

## Integrantes

- Clerciane Lopes Pereira dos Santos
- Luzia de Sousa dos Santos
- Andressa Cristina Lima da Silva