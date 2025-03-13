-- Tabela de categoria (se ainda não existir)
CREATE TABLE IF NOT EXISTS categoria (
    codigo BIGSERIAL PRIMARY KEY,
    nome VARCHAR(50) NOT NULL
);

-- Inserções iniciais de categorias
INSERT INTO categoria (nome) VALUES ('Lazer');
INSERT INTO categoria (nome) VALUES ('Alimentação');
INSERT INTO categoria (nome) VALUES ('Supermercado');
INSERT INTO categoria (nome) VALUES ('Farmácia');
INSERT INTO categoria (nome) VALUES ('Outros');