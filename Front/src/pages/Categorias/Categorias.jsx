import { useEffect, useState } from 'react';
import API_URL from '../../services/api';
import Botao from '../../components/Botao/Botao';
import { formatarValor, corCategoria } from '../../utils/formatar';
import './Categorias.css';

function Categorias() {
  const [categorias, setCategorias] = useState([]);
  const [gastos, setGastos] = useState([]);
  const [nome, setNome] = useState('');
  const [editandoId, setEditandoId] = useState(null);
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');

  const tratarErro = (e) =>
    setErro(e.message === 'Failed to fetch' ? 'Não foi possível conectar à API' : e.message);

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

  const carregarGastos = async () => {
    try {
      const resposta = await fetch(`${API_URL}/gastos`);
      const dados = await resposta.json();
      if (resposta.ok) setGastos(dados);
    } catch {
      // o resumo por categoria é opcional; o erro principal já aparece ao carregar categorias
    }
  };

  useEffect(() => {
    carregarCategorias();
    carregarGastos();
  }, []);

  useEffect(() => {
    if (!sucesso) return;
    const timer = setTimeout(() => setSucesso(''), 3500);
    return () => clearTimeout(timer);
  }, [sucesso]);

  const limparFormulario = () => {
    setNome('');
    setEditandoId(null);
  };

  const salvar = async (evento) => {
    evento.preventDefault();
    setErro('');
    setSucesso('');

    if (!nome.trim()) {
      setErro('Informe o nome da categoria');
      return;
    }

    const url = editandoId ? `${API_URL}/categorias/${editandoId}` : `${API_URL}/categorias`;
    const metodo = editandoId ? 'PUT' : 'POST';

    try {
      const resposta = await fetch(url, {
        method: metodo,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cat_nome: nome }),
      });
      const dados = await resposta.json();
      if (!resposta.ok) throw new Error(dados.erro || 'Erro ao salvar categoria');

      setSucesso(editandoId ? 'Categoria atualizada com sucesso' : 'Categoria cadastrada com sucesso');
      limparFormulario();
      carregarCategorias();
    } catch (e) {
      tratarErro(e);
    }
  };

  const editar = (categoria) => {
    setErro('');
    setSucesso('');
    setEditandoId(categoria.cat_id);
    setNome(categoria.cat_nome);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const excluir = async (categoria) => {
    if (!window.confirm(`Deseja excluir a categoria "${categoria.cat_nome}"?`)) return;
    setErro('');
    setSucesso('');

    try {
      const resposta = await fetch(`${API_URL}/categorias/${categoria.cat_id}`, { method: 'DELETE' });
      const dados = await resposta.json();
      if (!resposta.ok) throw new Error(dados.erro || 'Erro ao excluir categoria');

      setSucesso('Categoria excluída com sucesso');
      if (editandoId === categoria.cat_id) limparFormulario();
      carregarCategorias();
    } catch (e) {
      tratarErro(e);
    }
  };

  const resumo = (catId) => {
    const daCategoria = gastos.filter((g) => g.cat_id === catId);
    return {
      quantidade: daCategoria.length,
      total: daCategoria.reduce((soma, g) => soma + Number(g.gas_valor), 0),
    };
  };

  return (
    <section className="categorias">
      <div className="categorias-cabecalho">
        <h2>Categorias</h2>
        <p>Organize seus gastos em categorias.</p>
      </div>

      {erro && (
        <p className="categorias-mensagem categorias-erro">
          {erro}
          <button type="button" onClick={() => setErro('')} aria-label="Fechar">×</button>
        </p>
      )}
      {sucesso && <p className="categorias-mensagem categorias-sucesso">{sucesso}</p>}

      <div className="categorias-layout">
        <form className={`categorias-form ${editandoId ? 'categorias-form-editando' : ''}`} onSubmit={salvar}>
          <h3>{editandoId ? 'Editar categoria' : 'Nova categoria'}</h3>
          <label htmlFor="cat_nome">Nome</label>
          <input
            id="cat_nome"
            type="text"
            maxLength={50}
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Ex.: Saúde"
          />
          <div className="categorias-acoes">
            <Botao texto={editandoId ? 'Salvar alterações' : 'Cadastrar'} type="submit" />
            {editandoId && <Botao texto="Cancelar" tipo="secundario" onClick={limparFormulario} />}
          </div>
        </form>

        <div className="categorias-lista">
          <table className="categorias-tabela">
            <thead>
              <tr>
                <th>Categoria</th>
                <th>Gastos</th>
                <th>Total</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {categorias.length === 0 ? (
                <tr>
                  <td colSpan="4" className="categorias-vazio">Nenhuma categoria cadastrada</td>
                </tr>
              ) : (
                categorias.map((categoria) => {
                  const { quantidade, total } = resumo(categoria.cat_id);
                  return (
                    <tr key={categoria.cat_id} className={editandoId === categoria.cat_id ? 'categorias-linha-editando' : ''}>
                      <td className="categorias-celula-nome">
                        <span className="categorias-nome">
                          <i style={{ backgroundColor: corCategoria(categoria.cat_id) }} />
                          {categoria.cat_nome}
                        </span>
                      </td>
                      <td className="categorias-qtd">{quantidade} {quantidade === 1 ? 'gasto' : 'gastos'}</td>
                      <td className="categorias-total">{formatarValor(total)}</td>
                      <td className="categorias-celula-botoes">
                        <div className="categorias-botoes">
                          <Botao texto="Editar" tipo="secundario" onClick={() => editar(categoria)} />
                          <Botao texto="Excluir" tipo="perigo" onClick={() => excluir(categoria)} />
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default Categorias;
