import './Botao.css';

function Botao({ texto, onClick, type = 'button', tipo }) {
  const classe = tipo ? `botao botao-${tipo}` : 'botao';

  return (
    <button type={type} className={classe} onClick={onClick}>
      {texto}
    </button>
  );
}

export default Botao;
