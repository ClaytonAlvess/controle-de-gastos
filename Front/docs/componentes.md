# Componentes

| Componente | Local | Responsabilidade | Props |
|------------|-------|------------------|-------|
| Header | `src/components/Header` | Exibir título e navegação principal (Início, Gastos e Categorias) | - |
| Footer | `src/components/Footer` | Exibir informações no rodapé | - |
| Botao | `src/components/Botao` | Padronizar botões reutilizáveis | `texto`, `onClick`, `type` (`button` padrão, `submit`) e `tipo` (`perigo`, `secundario`; sem tipo = botão principal verde) |

## Exemplo de uso do Botao

```jsx
<Botao texto="Cadastrar" type="submit" />
<Botao texto="Editar" tipo="secundario" onClick={() => editar(item)} />
<Botao texto="Excluir" tipo="perigo" onClick={() => excluir(item)} />
```

## Utilitários

| Arquivo | Responsabilidade |
|---------|------------------|
| `src/services/api.js` | Exportar a URL da API (`http://localhost:3000`) |
| `src/utils/formatar.js` | Formatar valores em reais e datas no padrão brasileiro e definir a cor de cada categoria |
