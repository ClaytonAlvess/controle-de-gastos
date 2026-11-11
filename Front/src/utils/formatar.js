export const formatarValor = (valor) =>
  Number(valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

export const formatarData = (data) => {
  const [ano, mes, dia] = data.split('-');
  return `${dia}/${mes}/${ano}`;
};

export const hoje = () => new Date().toLocaleDateString('en-CA');

const CORES = ['#2e7d32', '#1565c0', '#ef6c00', '#6a1b9a', '#c62828', '#00838f', '#ad1457', '#4e342e', '#558b2f', '#283593'];

// Cor fixa para cada categoria (mesmo ID = mesma cor em todas as telas)
export const corCategoria = (catId) => CORES[(Number(catId) - 1) % CORES.length];
