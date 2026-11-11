import { useEffect, useState } from 'react';
import API_URL from '../../services/api';
import Botao from '../../components/Botao/Botao';
import './Gastos.css';

const hoje = () => new Date().toLocaleDateString('en-CA');

const formularioVazio = () => ({
  gas_descricao: '',
  gas_valor: '',
  gas_data: hoje(),
  cat_id: '',
});

const formatarValor = (valor) =>
  Number(valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

const formatarData = (data) => {
  const [ano, mes, dia] = data.split('-');
  return `${dia}/${mes}/${ano}`;
};

function Gastos() {
  const [gastos, setGastos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [form, setForm] = useState(formularioVazio());
  const [editandoId, setEditandoId] = useState(null);
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');

  const tratarErro = (e) =>
    setErro(e.message === 'Failed to fetch' ? 'Não foi possível conectar à API' : e.message);

  const carregarGastos = async () => {
    try {
      const resposta = await fetch(`${API_URL}/gastos`);
      const dados = await resposta.json();
      if (!resposta.ok) throw new Error(dados.erro || 'Erro ao carregar gastos');
      setGastos(dados);
    } catch (e) {
      tratarErro(e);
    }
  };

  const carregarCategorias = async () => {
    try {
      const resposta = await fetch(`${API_URL}/categorias`);
      const dados = await resposta.json();
      if (!resposta.ok) throw new Error(dados.erro || 'Erro ao carregar categorias');
      setCategorias(dados);
    } catch (e) {
      tratarErro(e);
    }
  };

  useEffect(() => {
    carregarGastos();
    carregarCategorias();
  }, []);

  const alterarCampo = (evento) => {
    const { name, value } = evento.target;
    setForm({ ...form, [name]: value });
  };

  const limparFormulario = () => {
    setForm(formularioVazio());
    setEditandoId(null);
  };

  const salvar = async (evento) => {
    evento.preventDefault();
    setErro('');
    setSucesso('');

    if (!form.gas_descricao.trim() || !form.gas_valor || !form.cat_id) {
      setErro('Preencha descrição, valor e categoria');
      return;
    }
    if (Number(form.gas_valor) <= 0) {
      setErro('O valor deve ser maior que zero');
      return;
    }

    const url = editandoId ? `${API_URL}/gastos/${editandoId}` : `${API_URL}/gastos`;
    const metodo = editandoId ? 'PUT' : 'POST';

    try {
      const resposta = await fetch(url, {
        method: metodo,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          gas_descricao: form.gas_descricao,
          gas_valor: Number(form.gas_valor),
          gas_data: form.gas_data,
          cat_id: Number(form.cat_id),
        }),
      });
      const dados = await resposta.json();
      if (!resposta.ok) throw new Error(dados.erro || 'Erro ao salvar gasto');

      setSucesso(editandoId ? 'Gasto atualizado com sucesso' : 'Gasto cadastrado com sucesso');
      limparFormulario();
      carregarGastos();
    } catch (e) {
      tratarErro(e);
    }
  };

  const editar = (gasto) => {
    setErro('');
    setSucesso('');
    setEditandoId(gasto.gas_id);
    setForm({
      gas_descricao: gasto.gas_descricao,
      gas_valor: gasto.gas_valor,
      gas_data: gasto.gas_data,
      cat_id: String(gasto.cat_id),
    });
  };

  const excluir = async (gasto) => {
    if (!window.confirm(`Deseja excluir o gasto "${gasto.gas_descricao}"?`)) return;
    setErro('');
    setSucesso('');

    try {
      const resposta = await fetch(`${API_URL}/gastos/${gasto.gas_id}`, { method: 'DELETE' });
      const dados = await resposta.json();
      if (!resposta.ok) throw new Error(dados.erro || 'Erro ao excluir gasto');

      setSucesso('Gasto excluído com sucesso');
      if (editandoId === gasto.gas_id) limparFormulario();
      carregarGastos();
    } catch (e) {
      tratarErro(e);
    }
  };

  const total = gastos.reduce((soma, gasto) => soma + Number(gasto.gas_valor), 0);

  return (
    <section className="gastos">
      <h2>Gastos</h2>

      <form className="gastos-form" onSubmit={salvar}>
        <h3>{editandoId ? 'Editar gasto' : 'Novo gasto'}</h3>
        <div className="gastos-campos">
          <div className="gastos-campo gastos-campo-largo">
            <label htmlFor="gas_descricao">Descrição</label>
            <input
              id="gas_descricao"
              name="gas_descricao"
              type="text"
              maxLength={100}
              value={form.gas_descricao}
              onChange={alterarCampo}
              placeholder="Ex.: Almoço"
            />
          </div>
          <div className="gastos-campo">
            <label htmlFor="gas_valor">Valor (R$)</label>
            <input
              id="gas_valor"
              name="gas_valor"
              type="number"
              step="0.01"
              min="0.01"
              value={form.gas_valor}
              onChange={alterarCampo}
              placeholder="0,00"
            />
          </div>
          <div className="gastos-campo">
            <label htmlFor="gas_data">Data</label>
            <input
              id="gas_data"
              name="gas_data"
              type="date"
              value={form.gas_data}
              onChange={alterarCampo}
            />
          </div>
          <div className="gastos-campo">
            <label htmlFor="cat_id">Categoria</label>
            <select id="cat_id" name="cat_id" value={form.cat_id} onChange={alterarCampo}>
              <option value="">Selecione...</option>
              {categorias.map((categoria) => (
                <option key={categoria.cat_id} value={categoria.cat_id}>
                  {categoria.cat_nome}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="gastos-acoes">
          <Botao texto={editandoId ? 'Atualizar' : 'Cadastrar'} type="submit" />
          {editandoId && <Botao texto="Cancelar" tipo="secundario" onClick={limparFormulario} />}
        </div>
      </form>

      {erro && <p className="gastos-mensagem gastos-erro">{erro}</p>}
      {sucesso && <p className="gastos-mensagem gastos-sucesso">{sucesso}</p>}

      <div className="gastos-tabela-container">
        <table className="gastos-tabela">
          <thead>
            <tr>
              <th>Data</th>
              <th>Descrição</th>
              <th>Categoria</th>
              <th>Valor</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {gastos.length === 0 ? (
              <tr>
                <td colSpan="5" className="gastos-vazio">Nenhum gasto cadastrado</td>
              </tr>
            ) : (
              gastos.map((gasto) => (
                <tr key={gasto.gas_id}>
                  <td>{formatarData(gasto.gas_data)}</td>
                  <td>{gasto.gas_descricao}</td>
                  <td>{gasto.categoria ? gasto.categoria.cat_nome : '-'}</td>
                  <td>{formatarValor(gasto.gas_valor)}</td>
                  <td className="gastos-botoes">
                    <Botao texto="Editar" tipo="secundario" onClick={() => editar(gasto)} />
                    <Botao texto="Excluir" tipo="perigo" onClick={() => excluir(gasto)} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="3">Total</td>
              <td colSpan="2">{formatarValor(total)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </section>
  );
}

export default Gastos;
