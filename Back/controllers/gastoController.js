const Gasto = require('../models/Gasto');
const Categoria = require('../models/Categoria');

const incluirCategoria = [{ model: Categoria, as: 'categoria' }];

const validar = ({ gas_descricao, gas_valor, cat_id }) => {
  if (!gas_descricao || !String(gas_descricao).trim()) return 'A descrição é obrigatória';
  if (gas_valor === undefined || gas_valor === '' || isNaN(Number(gas_valor)) || Number(gas_valor) <= 0) {
    return 'O valor deve ser um número maior que zero';
  }
  if (!cat_id) return 'A categoria é obrigatória';
  return null;
};

const listar = async (req, res) => {
  try {
    const gastos = await Gasto.findAll({
      include: incluirCategoria,
      order: [['gas_data', 'DESC'], ['gas_id', 'DESC']],
    });
    res.json(gastos);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
};

const buscar = async (req, res) => {
  try {
    const gasto = await Gasto.findByPk(req.params.id, { include: incluirCategoria });
    if (!gasto) {
      return res.status(404).json({ erro: 'Gasto não encontrado' });
    }
    res.json(gasto);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
};

const inserir = async (req, res) => {
  try {
    const mensagem = validar(req.body);
    if (mensagem) return res.status(400).json({ erro: mensagem });

    const { gas_descricao, gas_valor, gas_data, cat_id } = req.body;
    const categoria = await Categoria.findByPk(cat_id);
    if (!categoria) return res.status(400).json({ erro: 'Categoria informada não existe' });

    const dados = { gas_descricao: String(gas_descricao).trim(), gas_valor, cat_id };
    if (gas_data) dados.gas_data = gas_data;

    const gasto = await Gasto.create(dados);
    res.status(201).json(gasto);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
};

const atualizar = async (req, res) => {
  try {
    const gasto = await Gasto.findByPk(req.params.id);
    if (!gasto) {
      return res.status(404).json({ erro: 'Gasto não encontrado' });
    }
    const mensagem = validar(req.body);
    if (mensagem) return res.status(400).json({ erro: mensagem });

    const { gas_descricao, gas_valor, gas_data, cat_id } = req.body;
    const categoria = await Categoria.findByPk(cat_id);
    if (!categoria) return res.status(400).json({ erro: 'Categoria informada não existe' });

    const dados = { gas_descricao: String(gas_descricao).trim(), gas_valor, cat_id };
    if (gas_data) dados.gas_data = gas_data;

    await gasto.update(dados);
    res.json(gasto);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
};

const excluir = async (req, res) => {
  try {
    const gasto = await Gasto.findByPk(req.params.id);
    if (!gasto) {
      return res.status(404).json({ erro: 'Gasto não encontrado' });
    }
    await gasto.destroy();
    res.json({ mensagem: 'Gasto excluído com sucesso' });
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
};

module.exports = { listar, buscar, inserir, atualizar, excluir };
