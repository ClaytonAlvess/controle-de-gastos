const Categoria = require('../models/Categoria');
const Gasto = require('../models/Gasto');

const listar = async (req, res) => {
  try {
    const categorias = await Categoria.findAll({ order: [['cat_nome', 'ASC']] });
    res.json(categorias);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
};

const buscar = async (req, res) => {
  try {
    const categoria = await Categoria.findByPk(req.params.id);
    if (!categoria) {
      return res.status(404).json({ erro: 'Categoria não encontrada' });
    }
    res.json(categoria);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
};

const inserir = async (req, res) => {
  try {
    const { cat_nome } = req.body;
    if (!cat_nome || !cat_nome.trim()) {
      return res.status(400).json({ erro: 'O nome da categoria é obrigatório' });
    }
    const categoria = await Categoria.create({ cat_nome: cat_nome.trim() });
    res.status(201).json(categoria);
  } catch (erro) {
    if (erro.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ erro: 'Já existe uma categoria com esse nome' });
    }
    res.status(500).json({ erro: erro.message });
  }
};

const atualizar = async (req, res) => {
  try {
    const categoria = await Categoria.findByPk(req.params.id);
    if (!categoria) {
      return res.status(404).json({ erro: 'Categoria não encontrada' });
    }
    const { cat_nome } = req.body;
    if (!cat_nome || !cat_nome.trim()) {
      return res.status(400).json({ erro: 'O nome da categoria é obrigatório' });
    }
    await categoria.update({ cat_nome: cat_nome.trim() });
    res.json(categoria);
  } catch (erro) {
    if (erro.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ erro: 'Já existe uma categoria com esse nome' });
    }
    res.status(500).json({ erro: erro.message });
  }
};

const excluir = async (req, res) => {
  try {
    const categoria = await Categoria.findByPk(req.params.id);
    if (!categoria) {
      return res.status(404).json({ erro: 'Categoria não encontrada' });
    }
    const totalGastos = await Gasto.count({ where: { cat_id: categoria.cat_id } });
    if (totalGastos > 0) {
      return res.status(400).json({ erro: 'Não é possível excluir uma categoria que possui gastos cadastrados' });
    }
    await categoria.destroy();
    res.json({ mensagem: 'Categoria excluída com sucesso' });
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
};

module.exports = { listar, buscar, inserir, atualizar, excluir };
