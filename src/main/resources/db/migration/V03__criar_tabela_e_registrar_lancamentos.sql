CREATE TABLE lancamento (
	codigo BIGSERIAL PRIMARY KEY,
	descricao VARCHAR(50) NOT NULL,
	data_vencimento DATE NOT NULL,
	data_pagamento DATE,
	valor DECIMAL(10,2) NOT NULL,
	observacao VARCHAR(100),
	tipo VARCHAR(20) NOT NULL,
	codigo_categoria BIGINT NOT NULL,
	codigo_pessoa BIGINT NOT NULL,
	FOREIGN KEY (codigo_categoria) REFERENCES categoria(codigo),
	FOREIGN KEY (codigo_pessoa) REFERENCES pessoa(codigo)
);
-- Atualização das datas existentes
INSERT INTO lancamento (descricao, data_vencimento, data_pagamento, valor, observacao, tipo, codigo_categoria, codigo_pessoa) values ('Salário mensal', '2025-03-01', '2025-03-02', 6500.00, 'Distribuição de lucros', 'RECEITA', 1, 1);
INSERT INTO lancamento (descricao, data_vencimento, data_pagamento, valor, observacao, tipo, codigo_categoria, codigo_pessoa) values ('Bahamas', '2025-03-03', '2025-03-04', 100.32, 'Viagem', 'DESPESA', 2, 2);
INSERT INTO lancamento (descricao, data_vencimento, data_pagamento, valor, observacao, tipo, codigo_categoria, codigo_pessoa) values ('Top Club', '2025-03-05', '2025-03-06', 120, 'Clube', 'RECEITA', 3, 3);
INSERT INTO lancamento (descricao, data_vencimento, data_pagamento, valor, observacao, tipo, codigo_categoria, codigo_pessoa) values ('CEMIG', '2025-03-07', '2025-03-08', 110.44, 'Geração', 'RECEITA', 3, 4);
INSERT INTO lancamento (descricao, data_vencimento, data_pagamento, valor, observacao, tipo, codigo_categoria, codigo_pessoa) values ('DMAE', '2025-03-09', '2025-03-10', 200.30, 'Água', 'DESPESA', 3, 5);
INSERT INTO lancamento (descricao, data_vencimento, data_pagamento, valor, observacao, tipo, codigo_categoria, codigo_pessoa) values ('Extra', '2025-03-11', '2025-03-12', 1010.32, 'Supermercado', 'RECEITA', 4, 6);
INSERT INTO lancamento (descricao, data_vencimento, data_pagamento, valor, observacao, tipo, codigo_categoria, codigo_pessoa) values ('Bahamas', '2025-03-13', '2025-03-14', 500, 'Viagem', 'RECEITA', 1, 7);
INSERT INTO lancamento (descricao, data_vencimento, data_pagamento, valor, observacao, tipo, codigo_categoria, codigo_pessoa) values ('Top Club', '2025-03-15', '2025-03-16', 400.32, 'Clube', 'DESPESA', 4, 8);
INSERT INTO lancamento (descricao, data_vencimento, data_pagamento, valor, observacao, tipo, codigo_categoria, codigo_pessoa) values ('Despachante', '2025-03-17', '2025-03-18', 123.64, 'Multas', 'DESPESA', 3, 9);
INSERT INTO lancamento (descricao, data_vencimento, data_pagamento, valor, observacao, tipo, codigo_categoria, codigo_pessoa) values ('Pneus', '2025-03-19', '2025-03-20', 665.33, 'Carro', 'RECEITA', 5, 10);
INSERT INTO lancamento (descricao, data_vencimento, data_pagamento, valor, observacao, tipo, codigo_categoria, codigo_pessoa) values ('Café', '2025-03-21', '2025-03-22', 8.32, 'Lanche', 'DESPESA', 1, 5);
INSERT INTO lancamento (descricao, data_vencimento, data_pagamento, valor, observacao, tipo, codigo_categoria, codigo_pessoa) values ('Eletrônicos', '2025-03-23', '2025-03-24', 2100.32, 'Compra', 'DESPESA', 5, 4);
INSERT INTO lancamento (descricao, data_vencimento, data_pagamento, valor, observacao, tipo, codigo_categoria, codigo_pessoa) values ('Instrumentos', '2025-03-25', '2025-03-26', 1040.32, 'Música', 'DESPESA', 4, 3);
INSERT INTO lancamento (descricao, data_vencimento, data_pagamento, valor, observacao, tipo, codigo_categoria, codigo_pessoa) values ('Café', '2025-03-27', '2025-03-28', 4.32, 'Lanche', 'DESPESA', 4, 2);
INSERT INTO lancamento (descricao, data_vencimento, data_pagamento, valor, observacao, tipo, codigo_categoria, codigo_pessoa) values ('Lanche', '2025-03-29', '2025-03-30', 10.20, 'Lanche', 'DESPESA', 4, 1);

-- Novos lançamentos
INSERT INTO lancamento (descricao, data_vencimento, data_pagamento, valor, observacao, tipo, codigo_categoria, codigo_pessoa) values ('Aluguel', '2025-03-01', '2025-03-02', 1500.00, 'Apartamento', 'DESPESA', 1, 1);
INSERT INTO lancamento (descricao, data_vencimento, data_pagamento, valor, observacao, tipo, codigo_categoria, codigo_pessoa) values ('Internet', '2025-03-03', '2025-03-04', 100.00, 'Mensalidade', 'DESPESA', 2, 2);
INSERT INTO lancamento (descricao, data_vencimento, data_pagamento, valor, observacao, tipo, codigo_categoria, codigo_pessoa) values ('Academia', '2025-03-05', '2025-03-06', 80.00, 'Mensalidade', 'DESPESA', 3, 3);
INSERT INTO lancamento (descricao, data_vencimento, data_pagamento, valor, observacao, tipo, codigo_categoria, codigo_pessoa) values ('Supermercado', '2025-03-07', '2025-03-08', 300.00, 'Compras', 'DESPESA', 4, 4);
INSERT INTO lancamento (descricao, data_vencimento, data_pagamento, valor, observacao, tipo, codigo_categoria, codigo_pessoa) values ('Farmácia', '2025-03-09', '2025-03-10', 50.00, 'Medicamentos', 'DESPESA', 5, 5);
INSERT INTO lancamento (descricao, data_vencimento, data_pagamento, valor, observacao, tipo, codigo_categoria, codigo_pessoa) values ('Cinema', '2025-03-11', '2025-03-12', 40.00, 'Lazer', 'DESPESA', 1, 6);
INSERT INTO lancamento (descricao, data_vencimento, data_pagamento, valor, observacao, tipo, codigo_categoria, codigo_pessoa) values ('Restaurante', '2025-03-13', '2025-03-14', 120.00, 'Almoço', 'DESPESA', 2, 7);
INSERT INTO lancamento (descricao, data_vencimento, data_pagamento, valor, observacao, tipo, codigo_categoria, codigo_pessoa) values ('Combustível', '2025-03-15', '2025-03-16', 200.00, 'Carro', 'DESPESA', 3, 8);
INSERT INTO lancamento (descricao, data_vencimento, data_pagamento, valor, observacao, tipo, codigo_categoria, codigo_pessoa) values ('Manutenção', '2025-03-17', '2025-03-18', 500.00, 'Carro', 'DESPESA', 4, 9);
INSERT INTO lancamento (descricao, data_vencimento, data_pagamento, valor, observacao, tipo, codigo_categoria, codigo_pessoa) values ('Curso', '2025-03-19', '2025-03-20', 300.00, 'Educação', 'DESPESA', 5, 10);
INSERT INTO lancamento (descricao, data_vencimento, data_pagamento, valor, observacao, tipo, codigo_categoria, codigo_pessoa) values ('Salário', '2025-03-21', '2025-03-22', 5000.00, 'Trabalho', 'RECEITA', 1, 1);
INSERT INTO lancamento (descricao, data_vencimento, data_pagamento, valor, observacao, tipo, codigo_categoria, codigo_pessoa) values ('Freelance', '2025-03-23', '2025-03-24', 2000.00, 'Projeto', 'RECEITA', 2, 2);
INSERT INTO lancamento (descricao, data_vencimento, data_pagamento, valor, observacao, tipo, codigo_categoria, codigo_pessoa) values ('Investimento', '2025-03-25', '2025-03-26', 1000.00, 'Ações', 'RECEITA', 3, 3);
INSERT INTO lancamento (descricao, data_vencimento, data_pagamento, valor, observacao, tipo, codigo_categoria, codigo_pessoa) values ('Aluguel', '2025-03-27', '2025-03-28', 1500.00, 'Imóvel', 'RECEITA', 4, 4);
INSERT INTO lancamento (descricao, data_vencimento, data_pagamento, valor, observacao, tipo, codigo_categoria, codigo_pessoa) values ('Venda', '2025-03-29', '2025-03-30', 3000.00, 'Produto', 'RECEITA', 5, 5);
INSERT INTO lancamento (descricao, data_vencimento, data_pagamento, valor, observacao, tipo, codigo_categoria, codigo_pessoa) values ('Consultoria', '2025-03-01', '2025-03-02', 2500.00, 'Serviço', 'RECEITA', 1, 6);
INSERT INTO lancamento (descricao, data_vencimento, data_pagamento, valor, observacao, tipo, codigo_categoria, codigo_pessoa) values ('Bônus', '2025-03-03', '2025-03-04', 800.00, 'Trabalho', 'RECEITA', 2, 7);
INSERT INTO lancamento (descricao, data_vencimento, data_pagamento, valor, observacao, tipo, codigo_categoria, codigo_pessoa) values ('Prêmio', '2025-03-05', '2025-03-06', 1000.00, 'Concurso', 'RECEITA', 3, 8);
INSERT INTO lancamento (descricao, data_vencimento, data_pagamento, valor, observacao, tipo, codigo_categoria, codigo_pessoa) values ('Doação', '2025-03-07', '2025-03-08', 500.00, 'Caridade', 'RECEITA', 4, 9);
INSERT INTO lancamento (descricao, data_vencimento, data_pagamento, valor, observacao, tipo, codigo_categoria, codigo_pessoa) values ('Herança', '2025-03-09', '2025-03-10', 10000.00, 'Família', 'RECEITA', 5, 10);