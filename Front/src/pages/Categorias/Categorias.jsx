import { useEffect, useState } from 'react';
import API_URL from '../../services/api';
import Botao from '../../components/Botao/Botao';
import './Categorias.css';

function Categorias() {
  const [categorias, setCategorias] = useState([]);
  const [nome, setNome] = useState('');
  const [editandoId, setEditandoId] = useState(null);
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');

  const carregarCategorias = async () => {
    try {
      const resposta = await fetch(`${API_URL}/categorias`);
      const dados = await resposta.json();
      if (!resposta.ok) throw new Error(dados.erro || 'Erro ao carregar categorias');
      setCategorias(dados);
    } catch (e) {
      setErro(e.message === 'Failed to fetch' ? 'Não foi possível conectar à API' : e.message);
    }
  };

  useEffect(() => {
    carregarCategorias();
  }, []);

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
      setErro(e.message);
    }
  };

  const editar = (categoria) => {
    setErro('');
    setSucesso('');
    setEditandoId(categoria.cat_id);
    setNome(categoria.cat_nome);
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
      setErro(e.message);
    }
  };

  return (
    <section className="categorias">
      <h2>Categorias</h2>

      <form className="categorias-form" onSubmit={salvar}>
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
          <Botao texto={editandoId ? 'Atualizar' : 'Cadastrar'} type="submit" />
          {editandoId && <Botao texto="Cancelar" tipo="secundario" onClick={limparFormulario} />}
        </div>
      </form>

      {erro && <p className="categorias-mensagem categorias-erro">{erro}</p>}
      {sucesso && <p className="categorias-mensagem categorias-sucesso">{sucesso}</p>}

      <table className="categorias-tabela">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {categorias.length === 0 ? (
            <tr>
              <td colSpan="3" className="categorias-vazio">Nenhuma categoria cadastrada</td>
            </tr>
          ) : (
            categorias.map((categoria) => (
              <tr key={categoria.cat_id}>
                <td>{categoria.cat_id}</td>
                <td>{categoria.cat_nome}</td>
                <td>
                  <div className="categorias-botoes">
                    <Botao texto="Editar" tipo="secundario" onClick={() => editar(categoria)} />
                    <Botao texto="Excluir" tipo="perigo" onClick={() => excluir(categoria)} />
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </section>
  );
}

export default Categorias;
