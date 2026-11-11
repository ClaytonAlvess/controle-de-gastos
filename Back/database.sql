CREATE TABLE categoria (
  cat_id SERIAL PRIMARY KEY,
  cat_nome VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE gasto (
  gas_id SERIAL PRIMARY KEY,
  gas_descricao VARCHAR(100) NOT NULL,
  gas_valor NUMERIC(10,2) NOT NULL,
  gas_data DATE NOT NULL DEFAULT CURRENT_DATE,
  cat_id INTEGER NOT NULL REFERENCES categoria(cat_id)
);

INSERT INTO categoria (cat_nome) VALUES ('Alimentação'), ('Transporte'), ('Lazer');

-- Índice para a chave estrangeira (sugestão do Performance Advisor do Supabase)
CREATE INDEX idx_gasto_cat_id ON gasto(cat_id);

-- Segurança (Security Advisor do Supabase): habilita RLS sem políticas.
-- Assim a API pública do Supabase (chaves anon/publishable) não acessa as tabelas.
-- A API Node conecta com o usuário postgres, que ignora RLS, e continua funcionando.
ALTER TABLE categoria ENABLE ROW LEVEL SECURITY;
ALTER TABLE gasto ENABLE ROW LEVEL SECURITY;
