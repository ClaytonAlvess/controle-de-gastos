import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API_URL from '../../services/api';
import { formatarValor, formatarData, corCategoria } from '../../utils/formatar';
import './Home.css';

const mesAtual = new Date().toLocaleDateString('en-CA').slice(0, 7);
const nomeMes = new Date().toLocaleDateString('pt-BR', { month: 'long' });

function Home() {
  const [gastos, setGastos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    const carregar = async () => {
      try {
        const [respGastos, respCategorias] = await Promise.all([
          fetch(`${API_URL}/gastos`),
          fetch(`${API_URL}/categorias`),
        ]);
        const dadosGastos = await respGastos.json();
        const dadosCategorias = await respCategorias.json();
        if (!respGastos.ok) throw new Error(dadosGastos.erro);
        if (!respCategorias.ok) throw new Error(dadosCategorias.erro);
        setGastos(dadosGastos);
        setCategorias(dadosCategorias);
      } catch (e) {
        setErro(e.message === 'Failed to fetch' ? 'Não foi possível conectar à API. Verifique se o Back está rodando.' : e.message);
      } finally {
        setCarregando(false);
      }
    };
    carregar();
  }, []);

  const total = gastos.reduce((soma, g) => soma + Number(g.gas_valor), 0);
  const totalMes = gastos
    .filter((g) => g.gas_data.startsWith(mesAtual))
    .reduce((soma, g) => soma + Number(g.gas_valor), 0);

  const porCategoria = categorias
    .map((c) => ({
      ...c,
      total: gastos.filter((g) => g.cat_id === c.cat_id).reduce((soma, g) => soma + Number(g.gas_valor), 0),
    }))
    .filter((c) => c.total > 0)
    .sort((a, b) => b.total - a.total);
  const maiorCategoria = porCategoria.length ? porCategoria[0].total : 0;

  const ultimos = gastos.slice(0, 5);

  return (
    <section className="home">
      <div className="home-boas-vindas">
        <div>
          <h2>Olá! 👋</h2>
          <p>Acompanhe para onde vai o seu dinheiro.</p>
        </div>
        <Link to="/gastos" className="home-novo">+ Novo gasto</Link>
      </div>

      {erro && <p className="home-erro">{erro}</p>}

      <div className="home-resumo">
        <div className="home-card-resumo home-card-destaque">
          <span>Total gasto</span>
          <strong>{carregando ? '...' : formatarValor(total)}</strong>
        </div>
        <div className="home-card-resumo">
          <span>Gasto em {nomeMes}</span>
          <strong>{carregando ? '...' : formatarValor(totalMes)}</strong>
        </div>
        <div className="home-card-resumo">
          <span>Gastos registrados</span>
          <strong>{carregando ? '...' : gastos.length}</strong>
        </div>
        <div className="home-card-resumo">
          <span>Categorias</span>
          <strong>{carregando ? '...' : categorias.length}</strong>
        </div>
      </div>

      <div className="home-paineis">
        <div className="home-painel">
          <div className="home-painel-topo">
            <h3>Gastos por categoria</h3>
            <Link to="/categorias">Ver categorias</Link>
          </div>
          {porCategoria.length === 0 ? (
            <p className="home-vazio">{carregando ? 'Carregando...' : 'Nenhum gasto cadastrado ainda.'}</p>
          ) : (
            <ul className="home-barras">
              {porCategoria.map((c) => (
                <li key={c.cat_id}>
                  <div className="home-barra-info">
                    <span>
                      <i style={{ backgroundColor: corCategoria(c.cat_id) }} />
                      {c.cat_nome}
                    </span>
                    <strong>{formatarValor(c.total)}</strong>
                  </div>
                  <div className="home-barra-fundo">
                    <div
                      className="home-barra"
                      style={{ width: `${(c.total / maiorCategoria) * 100}%`, backgroundColor: corCategoria(c.cat_id) }}
                    />
                  </div>
                  <small>{((c.total / total) * 100).toFixed(1)}% do total</small>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="home-painel">
          <div className="home-painel-topo">
            <h3>Últimos gastos</h3>
            <Link to="/gastos">Ver todos</Link>
          </div>
          {ultimos.length === 0 ? (
            <p className="home-vazio">{carregando ? 'Carregando...' : 'Nenhum gasto cadastrado ainda.'}</p>
          ) : (
            <ul className="home-ultimos">
              {ultimos.map((g) => (
                <li key={g.gas_id}>
                  <span className="home-ultimo-icone" style={{ backgroundColor: corCategoria(g.cat_id) }}>
                    {g.categoria ? g.categoria.cat_nome.charAt(0).toUpperCase() : '?'}
                  </span>
                  <div className="home-ultimo-texto">
                    <strong>{g.gas_descricao}</strong>
                    <small>{g.categoria ? g.categoria.cat_nome : '-'} · {formatarData(g.gas_data)}</small>
                  </div>
                  <span className="home-ultimo-valor">{formatarValor(g.gas_valor)}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}

export default Home;
