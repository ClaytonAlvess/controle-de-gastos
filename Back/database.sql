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
