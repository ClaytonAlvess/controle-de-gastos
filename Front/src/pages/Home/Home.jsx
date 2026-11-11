import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <section className="home">
      <h2>Bem-vindo ao Controle de Gastos</h2>
      <p>Cadastre suas categorias e registre seus gastos pessoais para acompanhar para onde vai o seu dinheiro.</p>
      <div className="home-cards">
        <Link to="/gastos" className="home-card">
          <h3>Gastos</h3>
          <p>Cadastre, edite, exclua e veja o total dos seus gastos.</p>
        </Link>
        <Link to="/categorias" className="home-card">
          <h3>Categorias</h3>
          <p>Organize seus gastos em categorias como Alimentação, Transporte e Lazer.</p>
        </Link>
      </div>
    </section>
  );
}

export default Home;
