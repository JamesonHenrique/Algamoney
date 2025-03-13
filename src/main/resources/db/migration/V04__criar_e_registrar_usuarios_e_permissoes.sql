-- Tabela de usuários
CREATE TABLE usuario (
    codigo BIGSERIAL PRIMARY KEY,
    email VARCHAR(50) NOT NULL UNIQUE,
    nome VARCHAR(50) NOT NULL,
    password VARCHAR(150) NOT NULL

);

-- Tabela de permissões
CREATE TABLE permissao (
    codigo BIGSERIAL PRIMARY KEY,
    descricao VARCHAR(50) NOT NULL
);

-- Tabela de roles
CREATE TABLE role (
    role_id BIGSERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE
);

-- Tabela de relacionamento entre usuários e roles
CREATE TABLE user_role (
    user_id BIGINT NOT NULL,
    role_id BIGINT NOT NULL,
    PRIMARY KEY (user_id, role_id),
    FOREIGN KEY (user_id) REFERENCES usuario(codigo),
    FOREIGN KEY (role_id) REFERENCES role(role_id)
);

-- Tabela de relacionamento entre usuários e permissões
CREATE TABLE usuario_permissao (
    codigo_usuario BIGINT NOT NULL,
    codigo_permissao BIGINT NOT NULL,
    PRIMARY KEY (codigo_usuario, codigo_permissao),
    FOREIGN KEY (codigo_usuario) REFERENCES usuario(codigo),
    FOREIGN KEY (codigo_permissao) REFERENCES permissao(codigo)
);

-- Inserções iniciais de usuários
INSERT INTO usuario (codigo, email, nome, password)
VALUES (2, 'maria@algamoney.com', 'Maria Silva', '$2a$10$Zc3w6HyuPOPXamaMhh.PQOXvDnEsadztbfi6/RyZWJDzimE8WQjaq');

-- Inserções iniciais de roles
INSERT INTO role (role_id, name)
VALUES (1, 'admin'),
       (2, 'basic');


-- Inserções iniciais de permissões
INSERT INTO permissao (codigo, descricao) 
VALUES (1, 'ROLE_CADASTRAR_CATEGORIA'),
       (2, 'ROLE_PESQUISAR_CATEGORIA'),
       (3, 'ROLE_CADASTRAR_PESSOA'),
       (4, 'ROLE_REMOVER_PESSOA'),
       (5, 'ROLE_PESQUISAR_PESSOA'),
       (6, 'ROLE_CADASTRAR_LANCAMENTO'),
       (7, 'ROLE_REMOVER_LANCAMENTO'),
       (8, 'ROLE_PESQUISAR_LANCAMENTO');

-- Permissões para Maria
INSERT INTO usuario_permissao (codigo_usuario, codigo_permissao) 
VALUES (2, 2), -- ROLE_PESQUISAR_CATEGORIA
       (2, 5), -- ROLE_PESQUISAR_PESSOA
       (2, 8); -- ROLE_PESQUISAR_LANCAMENTO

-- Roles para Maria
INSERT INTO user_role (user_id, role_id) 
VALUES (2, 1); -- Maria tem a role de admin