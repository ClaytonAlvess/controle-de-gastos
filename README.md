# Controle de Gastos

Sistema de controle de gastos pessoais desenvolvido para a avaliação individual de **Desenvolvimento Web Mobile II**. É um CRUD completo de **gastos** e **categorias**, com o Back (API REST) e o Front (React) separados neste monorrepositório.

## Funcionalidades

- Cadastrar, listar, editar e excluir categorias
- Cadastrar, listar, editar e excluir gastos (descrição, valor, data e categoria)
- Listagem de gastos ordenada por data (mais recentes primeiro) com o total
- Bloqueio da exclusão de categorias que possuem gastos
- Documentação da API com Swagger

## Tecnologias

**Back**
- Node.js + Express
- Sequelize + pg + pg-hstore
- PostgreSQL (Supabase)
- cors, dotenv
- swagger-jsdoc + swagger-ui-express

**Front**
- React + Vite
- react-router-dom
- Fetch API

## Estrutura

```
controle-de-gastos/
├── .gitignore
├── README.md
├── Back/
│   ├── config/database.js        # Conexão Sequelize com o PostgreSQL
│   ├── controllers/              # categoriaController.js, gastoController.js
│   ├── models/                   # Categoria.js, Gasto.js
│   ├── routes/                   # categoriaRoutes.js, gastoRoutes.js
│   ├── swagger/                  # categoriaSwagger.js, gastoSwagger.js
│   ├── swagger.js                # Configuração do Swagger (OpenAPI 3.0.0)
│   ├── database.sql              # Script de criação das tabelas
│   ├── index.js                  # Ponto de entrada da API
│   ├── .env.example
│   └── package.json
└── Front/
    ├── docs/                     # telas.md, componentes.md, testes.md
    ├── src/
    │   ├── components/           # Header, Footer, Botao (.jsx + .css)
    │   ├── pages/                # Home, Categorias, Gastos (.jsx + .css)
    │   ├── services/api.js       # URL da API
    │   ├── App.jsx
    │   ├── index.css
    │   └── main.jsx
    ├── index.html
    └── package.json
```

## Banco de dados

Tabelas `categoria` e `gasto` (cada gasto pertence a uma categoria). No Supabase, abra o **SQL Editor** e execute o conteúdo de [`Back/database.sql`](Back/database.sql).

## Como rodar

Pré-requisitos: Node.js 18 ou superior e um banco PostgreSQL (Supabase).

### Back (API)

```bash
cd Back
npm install
cp .env.example .env    # depois coloque a sua DATABASE_URL no .env
npm start
```

A API sobe em `http://localhost:3000` e a documentação fica em `http://localhost:3000/api-docs`.

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | /categorias | Lista as categorias |
| GET | /categorias/:id | Busca uma categoria |
| POST | /categorias | Cadastra uma categoria |
| PUT | /categorias/:id | Atualiza uma categoria |
| DELETE | /categorias/:id | Exclui uma categoria (sem gastos) |
| GET | /gastos | Lista os gastos (com a categoria, por data desc) |
| GET | /gastos/:id | Busca um gasto |
| POST | /gastos | Cadastra um gasto |
| PUT | /gastos/:id | Atualiza um gasto |
| DELETE | /gastos/:id | Exclui um gasto |

### Front

Com o Back rodando, em outro terminal:

```bash
cd Front
npm install
npm run dev
```

Acesse `http://localhost:5173`. Para gerar o build de produção: `npm run build`.
