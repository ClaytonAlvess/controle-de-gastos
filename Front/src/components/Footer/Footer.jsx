import './Footer.css';

const anoAtual = new Date().getFullYear();

function Footer() {
  return (
    <footer className="footer">
      <p>Controle de Gastos &copy; {anoAtual} - Desenvolvimento Web Mobile II</p>
    </footer>
  );
}

export default Footer;
