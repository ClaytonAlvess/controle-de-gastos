import './Footer.css';

const anoAtual = new Date().getFullYear();

function Footer() {
  return (
    <footer className="footer">
      <p className="footer-titulo">Controle de Gastos</p>
      <p>&copy; {anoAtual} · Desenvolvimento Web Mobile II</p>
    </footer>
  );
}

export default Footer;
