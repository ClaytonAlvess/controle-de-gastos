# Testes

Testes realizados com o Back rodando em `http://localhost:3000` e o Front em `http://localhost:5173`.

## API (curl)

| Rota | Teste | Resultado esperado | Situação |
|------|-------|--------------------|----------|
| GET /categorias | Listar categorias | 200 com a lista | OK |
| GET /categorias/1 | Buscar categoria existente | 200 com a categoria | OK |
| GET /categorias/999 | Buscar categoria inexistente | 404 `{ erro }` | OK |
| GET /categorias/abc | Buscar com ID inválido | 400 `{ erro }` | OK |
| POST /categorias | Cadastrar `{ "cat_nome": "Saúde" }` | 201 com a categoria criada | OK |
| POST /categorias | Cadastrar nome repetido | 400 `{ erro }` | OK |
| POST /categorias | Cadastrar sem nome | 400 `{ erro }` | OK |
| PUT /categorias/4 | Atualizar nome | 200 com a categoria atualizada | OK |
| PUT /categorias/999 | Atualizar inexistente | 404 `{ erro }` | OK |
| DELETE /categorias/4 | Excluir categoria sem gastos | 200 `{ mensagem }` | OK |
| DELETE /categorias/1 | Excluir categoria com gastos | 400 `{ erro }` | OK |
| DELETE /categorias/999 | Excluir inexistente | 404 `{ erro }` | OK |
| GET /gastos | Listar gastos | 200, com categoria incluída e ordenado por data desc | OK |
| GET /gastos/1 | Buscar gasto existente | 200 com o gasto e a categoria | OK |
| GET /gastos/999 | Buscar gasto inexistente | 404 `{ erro }` | OK |
| POST /gastos | Cadastrar gasto com data | 201 com o gasto criado | OK |
| POST /gastos | Cadastrar gasto sem data | 201, data atual usada | OK |
| POST /gastos | Valor negativo | 400 `{ erro }` | OK |
| POST /gastos | Categoria inexistente | 400 `{ erro }` | OK |
| PUT /gastos/1 | Atualizar gasto | 200 com o gasto atualizado | OK |
| PUT /gastos/999 | Atualizar inexistente | 404 `{ erro }` | OK |
| DELETE /gastos/3 | Excluir gasto | 200 `{ mensagem }` | OK |
| DELETE /gastos/999 | Excluir inexistente | 404 `{ erro }` | OK |
| GET /api-docs | Abrir documentação Swagger | 200, todas as rotas listadas | OK |

## Interface (Front)

| Tela | Operação | Passos | Resultado esperado | Situação |
|------|----------|--------|--------------------|----------|
| Categorias | Listar | Abrir `/categorias` | Tabela com as categorias | OK |
| Categorias | Cadastrar | Digitar "Educação" e clicar em Cadastrar | Mensagem de sucesso e categoria na tabela | OK |
| Categorias | Editar | Clicar em Editar, alterar o nome e clicar em Atualizar | Formulário preenchido, depois nome atualizado na tabela | OK |
| Categorias | Excluir | Clicar em Excluir numa categoria sem gastos e confirmar | Categoria removida da tabela | OK |
| Categorias | Excluir com gastos | Clicar em Excluir em "Alimentação" (com gastos) | Mensagem "Não é possível excluir uma categoria que possui gastos cadastrados" | OK |
| Gastos | Listar | Abrir `/gastos` | Tabela ordenada por data com o total no fim | OK |
| Gastos | Select de categoria | Abrir o select | Categorias carregadas da API | OK |
| Gastos | Cadastrar | Preencher descrição, valor, data e categoria e clicar em Cadastrar | Gasto na tabela e total atualizado | OK |
| Gastos | Editar | Clicar em Editar, mudar valor e categoria e clicar em Atualizar | Formulário preenchido, depois dados e total atualizados | OK |
| Gastos | Validação | Clicar em Cadastrar com o formulário vazio | Mensagem "Preencha descrição, valor e categoria" | OK |
| Gastos | Excluir | Clicar em Excluir e confirmar | Gasto removido e total atualizado | OK |

## Build

| Comando | Resultado | Situação |
|---------|-----------|----------|
| `npm run build` (Front) | Build gerado em `dist/` sem erros | OK |
