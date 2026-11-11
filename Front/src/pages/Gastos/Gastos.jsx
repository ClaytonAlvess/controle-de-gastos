import { useEffect, useState } from 'react';
import API_URL from '../../services/api';
import Botao from '../../components/Botao/Botao';
import { formatarValor, formatarData, hoje, corCategoria } from '../../utils/formatar';
import './Gastos.css';

const formularioVazio = () => ({
  gas_descricao: '',
  gas_valor: '',
  gas_data: hoje(),
  cat_id: '',
});

function Gastos() {
  const [gastos, setGastos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [form, setForm] = useState(formularioVazio());
  const [editandoId, setEditandoId] = useState(null);
  const [busca, setBusca] = useState('');
  const [filtroCategoria, setFiltroCategoria] = useState('');
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

  useEffect(() => {
    if (!sucesso) return;
    const timer = setTimeout(() => setSucesso(''), 3500);
    return () => clearTimeout(timer);
  }, [sucesso]);

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
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

  const gastosFiltrados = gastos.filter((g) => {
    const passaBusca = g.gas_descricao.toLowerCase().includes(busca.trim().toLowerCase());
    const passaCategoria = !filtroCategoria || g.cat_id === Number(filtroCategoria);
    return passaBusca && passaCategoria;
  });

  const total = gastosFiltrados.reduce((soma, gasto) => soma + Number(gasto.gas_valor), 0);
  const maior = gastosFiltrados.reduce((m, g) => Math.max(m, Number(g.gas_valor)), 0);
  const media = gastosFiltrados.length ? total / gastosFiltrados.length : 0;
  const filtrando = busca.trim() !== '' || filtroCategoria !== '';

  return (
    <section className="gastos">
      <div className="gastos-cabecalho">
        <h2>Gastos</h2>
        <p>Registre e acompanhe seus gastos pessoais.</p>
      </div>

      <div className="gastos-resumo">
        <div className="gastos-card gastos-card-destaque">
          <span>{filtrando ? 'Total filtrado' : 'Total gasto'}</span>
          <strong>{formatarValor(total)}</strong>
        </div>
        <div className="gastos-card">
          <span>Quantidade</span>
          <strong>{gastosFiltrados.length}</strong>
        </div>
        <div className="gastos-card">
          <span>Maior gasto</span>
          <strong>{formatarValor(maior)}</strong>
        </div>
        <div className="gastos-card">
          <span>Média por gasto</span>
          <strong>{formatarValor(media)}</strong>
        </div>
      </div>

      {erro && (
        <p className="gastos-mensagem gastos-erro">
          {erro}
          <button type="button" onClick={() => setErro('')} aria-label="Fechar">×</button>
        </p>
      )}
      {sucesso && <p className="gastos-mensagem gastos-sucesso">{sucesso}</p>}

      <form className={`gastos-form ${editandoId ? 'gastos-form-editando' : ''}`} onSubmit={salvar}>
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
          <Botao texto={editandoId ? 'Salvar alterações' : 'Cadastrar gasto'} type="submit" />
          {editandoId && <Botao texto="Cancelar" tipo="secundario" onClick={limparFormulario} />}
        </div>
      </form>

      <div className="gastos-lista">
        <div className="gastos-filtros">
          <input
            type="search"
            placeholder="Buscar pela descrição..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            aria-label="Buscar gasto"
          />
          <select value={filtroCategoria} onChange={(e) => setFiltroCategoria(e.target.value)} aria-label="Filtrar por categoria">
            <option value="">Todas as categorias</option>
            {categorias.map((categoria) => (
              <option key={categoria.cat_id} value={categoria.cat_id}>
                {categoria.cat_nome}
              </option>
            ))}
          </select>
        </div>

        <div className="gastos-tabela-container">
          <table className="gastos-tabela">
            <thead>
              <tr>
                <th>Data</th>
                <th>Descrição</th>
                <th>Categoria</th>
                <th className="gastos-direita">Valor</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {gastosFiltrados.length === 0 ? (
                <tr>
                  <td colSpan="5" className="gastos-vazio">
                    {filtrando ? 'Nenhum gasto encontrado com esse filtro' : 'Nenhum gasto cadastrado'}
                  </td>
                </tr>
              ) : (
                gastosFiltrados.map((gasto) => (
                  <tr key={gasto.gas_id} className={editandoId === gasto.gas_id ? 'gastos-linha-editando' : ''}>
                    <td className="gastos-data">{formatarData(gasto.gas_data)}</td>
                    <td className="gastos-descricao">{gasto.gas_descricao}</td>
                    <td className="gastos-categoria">
                      <span
                        className="gastos-badge"
                        style={{ color: corCategoria(gasto.cat_id), backgroundColor: `${corCategoria(gasto.cat_id)}1a` }}
                      >
                        {gasto.categoria ? gasto.categoria.cat_nome : '-'}
                      </span>
                    </td>
                    <td className="gastos-direita gastos-valor">{formatarValor(gasto.gas_valor)}</td>
                    <td className="gastos-celula-botoes">
                      <div className="gastos-botoes">
                        <Botao texto="Editar" tipo="secundario" onClick={() => editar(gasto)} />
                        <Botao texto="Excluir" tipo="perigo" onClick={() => excluir(gasto)} />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="3">Total {filtrando && <small>(filtrado)</small>}</td>
                <td className="gastos-direita">{formatarValor(total)}</td>
                <td className="gastos-sem-conteudo" />
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </section>
  );
}

export default Gastos;
