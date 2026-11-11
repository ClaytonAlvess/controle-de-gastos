const express = require('express');
const controller = require('../controllers/gastoController');

const router = express.Router();

router.param('id', (req, res, next, id) => {
  if (!/^\d+$/.test(id)) {
    return res.status(400).json({ erro: 'O ID deve ser um número inteiro' });
  }
  next();
});

router.get('/', controller.listar);
router.get('/:id', controller.buscar);
router.post('/', controller.inserir);
router.put('/:id', controller.atualizar);
router.delete('/:id', controller.excluir);

module.exports = router;
