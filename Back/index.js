require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const categoriaRoutes = require('./routes/categoriaRoutes');
const gastoRoutes = require('./routes/gastoRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ mensagem: 'API Controle de Gastos', documentacao: '/api-docs' });
});

app.use('/categorias', categoriaRoutes);
app.use('/gastos', gastoRoutes);

sequelize.authenticate()
  .then(() => {
    console.log('Conectado ao banco de dados');
    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
  })
  .catch((erro) => {
    console.error('Erro ao conectar no banco de dados:', erro.message);
    process.exit(1);
  });
