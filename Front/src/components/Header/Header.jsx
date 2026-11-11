import { NavLink } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="header-conteudo">
        <NavLink to="/" className="header-marca">
          <span className="header-logo">R$</span>
          <h1 className="header-titulo">Controle de Gastos</h1>
        </NavLink>
        <nav className="header-nav">
          <NavLink to="/" end>Início</NavLink>
          <NavLink to="/gastos">Gastos</NavLink>
          <NavLink to="/categorias">Categorias</NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;
