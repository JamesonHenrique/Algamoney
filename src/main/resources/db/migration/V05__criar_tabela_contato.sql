CREATE TABLE contato (
  codigo BIGSERIAL PRIMARY KEY,
  codigo_pessoa BIGINT NOT NULL,
  nome VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL,
  telefone VARCHAR(20) NOT NULL,
  FOREIGN KEY (codigo_pessoa) REFERENCES pessoa(codigo)
);
INSERT INTO contato (codigo, codigo_pessoa, nome, email, telefone)
VALUES
    (1, 1, 'Ana Clara', 'ana@algamoney.com', '11 1111-1111'),
    (2, 1, 'Carlos Eduardo', 'carlos@algamoney.com', '22 2222-2222'),
    (3, 2, 'Fernanda Lima', 'fernanda@algamoney.com', '33 3333-3333'),
    (4, 2, 'Ricardo Oliveira', 'ricardo@algamoney.com', '44 4444-4444'),
    (5, 3, 'Patrícia Souza', 'patricia@algamoney.com', '55 5555-5555'),
    (6, 1, 'Lucas Martins', 'lucas@algamoney.com', '66 6666-6666'),
    (7, 2, 'Juliana Costa', 'juliana@algamoney.com', '77 7777-7777'),
    (8, 3, 'Roberto Almeida', 'roberto@algamoney.com', '88 8888-8888'),
    (9, 1, 'Camila Ribeiro', 'camila@algamoney.com', '99 9999-9999'),
    (10, 2, 'Gustavo Pereira', 'gustavo@algamoney.com', '00 0000-0000');