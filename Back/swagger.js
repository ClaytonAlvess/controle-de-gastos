const swaggerJsdoc = require('swagger-jsdoc');
const path = require('path');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Controle de Gastos',
      version: '1.0.0',
      description: 'API REST para o CRUD de gastos pessoais e suas categorias',
    },
    servers: [{ url: 'http://localhost:3000' }],
    components: {
      schemas: {
        Erro: {
          type: 'object',
          properties: { erro: { type: 'string', example: 'Mensagem de erro' } },
        },
        Mensagem: {
          type: 'object',
          properties: { mensagem: { type: 'string', example: 'Registro excluído com sucesso' } },
        },
      },
    },
  },
  // glob exige barras normais (/), inclusive no Windows
  apis: [path.join(__dirname, 'swagger', '*.js').replace(/\\/g, '/')],
};

module.exports = swaggerJsdoc(options);
