# Telas

| Tela | Rota | Funcionalidade | Situação |
|------|------|----------------|----------|
| Início | `/` | Painel com total gasto, gasto do mês atual, quantidade de gastos e de categorias; gráfico de barras de gastos por categoria (com percentual) e lista dos 5 últimos gastos | Concluída |
| Categorias | `/categorias` | Cadastrar, listar, editar e excluir categorias. A tabela mostra a quantidade e o total de gastos de cada categoria. Exibe mensagem de erro ao tentar excluir categoria que possui gastos ou cadastrar nome repetido | Concluída |
| Gastos | `/gastos` | Cadastrar, listar, editar e excluir gastos. Cards de resumo (total, quantidade, maior gasto e média), select de categoria carregado da API, busca por descrição, filtro por categoria, lista ordenada por data (mais recente primeiro) e total no fim da tabela | Concluída |

## Responsividade

Todas as telas se adaptam ao celular: os cards de resumo ficam em duas colunas, o formulário ocupa a largura toda e, abaixo de 640px, as linhas das tabelas viram cards com os botões Editar e Excluir em destaque.

## Padrão visual

- Cor principal verde (`#2e7d32`), com destaque laranja na linha e no formulário em edição.
- Cada categoria tem uma cor fixa, usada nos badges, nas barras do painel e nos ícones dos últimos gastos.
- Mensagens de sucesso somem sozinhas depois de alguns segundos; mensagens de erro têm botão de fechar.
