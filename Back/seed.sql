-- Dados de exemplo (opcional). Rode depois do database.sql.
INSERT INTO categoria (cat_nome) VALUES ('Lazer'), ('Moradia'), ('Saúde'), ('Educação')
ON CONFLICT (cat_nome) DO NOTHING;

INSERT INTO gasto (gas_descricao, gas_valor, gas_data, cat_id)
SELECT v.descricao, v.valor, v.data::date, c.cat_id
FROM (VALUES
  ('Supermercado do mês', 487.35, '2026-11-03', 'Alimentação'),
  ('Almoço no restaurante', 42.90, '2026-11-10', 'Alimentação'),
  ('Padaria', 18.50, '2026-11-08', 'Alimentação'),
  ('Delivery de pizza', 64.00, '2026-11-01', 'Alimentação'),
  ('Feira', 56.20, '2026-10-25', 'Alimentação'),
  ('Combustível', 220.00, '2026-11-05', 'Transporte'),
  ('Uber para a faculdade', 23.40, '2026-11-09', 'Transporte'),
  ('Passe de ônibus', 120.00, '2026-11-02', 'Transporte'),
  ('Troca de óleo', 165.00, '2026-10-20', 'Transporte'),
  ('Cinema', 38.00, '2026-11-07', 'Lazer'),
  ('Assinatura de streaming', 39.90, '2026-11-04', 'Lazer'),
  ('Show de rock', 150.00, '2026-10-18', 'Lazer'),
  ('Aluguel', 1200.00, '2026-11-05', 'Moradia'),
  ('Conta de luz', 178.64, '2026-11-06', 'Moradia'),
  ('Internet', 99.90, '2026-11-10', 'Moradia'),
  ('Conta de água', 72.30, '2026-10-28', 'Moradia'),
  ('Farmácia', 87.45, '2026-11-04', 'Saúde'),
  ('Consulta médica', 250.00, '2026-10-22', 'Saúde'),
  ('Mensalidade da faculdade', 890.00, '2026-11-05', 'Educação'),
  ('Livro de React', 79.90, '2026-10-30', 'Educação')
) AS v(descricao, valor, data, categoria)
JOIN categoria c ON c.cat_nome = v.categoria;
