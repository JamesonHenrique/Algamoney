# AlgaMoney

<div align="center">

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

</div>

## 📑 Índice

<div align="center">

| 🌟 Essenciais | 🛠️ Desenvolvimento | 📚 Documentação |
|--------------|-------------------|----------------|
| [📋 Sobre](#-sobre) | [💻 Tecnologias](#-tecnologias) | [📖 API](#-api) |
| [⚙️ Funcionalidades](#%EF%B8%8F-funcionalidades) | [📦 Requisitos](#-requisitos) | [🤝 Contribuição](#-contribuindo) |
| [🎯 Objetivos](#-objetivos) | [🔧 Instalação](#-instalação) | [📄 Licença](#-licença) |

</div>

## Sobre

AlgaMoney é uma aplicação web de gerenciamento financeiro pessoal que permite aos usuários controlar suas finanças de forma eficiente e segura. O sistema oferece funcionalidades para cadastro de receitas, despesas e gerenciamento de pessoas.

### Objetivos

- Fornecer uma interface intuitiva para gestão financeira
- Facilitar o controle de receitas e despesas
- Permitir o gerenciamento de pessoas e categorias

### Diferenciais

- Interface moderna e responsiva com TailwindCSS
- Autenticação segura com OAuth2 e JWT
- API RESTful documentada com Swagger
- Sistema de notificações com Toastr

## Tecnologias

### Backend
- Java 17
- Spring Boot 3.2.5
- Spring Security com OAuth2
- Spring Data JPA
- PostgreSQL
- Flyway para migração
- Lombok

### Frontend
- Angular 19
- TailwindCSS
- NGX-Toastr
- Font Awesome
- Angular JWT

## Funcionalidades

### Autenticação
- Login de usuários
- Autenticação JWT
- Controle de permissões

### Lançamentos
- Cadastro de receitas e despesas
- Categorização
- Pesquisa de lançamentos
- Status de pagamento

### Pessoas
- Cadastro de pessoas
- Endereçamento
- Status ativo/inativo

## Requisitos

- Java 17+
- Node.js 18+
- PostgreSQL 12+
- Maven 3.6+

## Instalação

### Backend

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/algamoney.git
cd algamoney
```

2. Configure o banco de dados PostgreSQL no arquivo `src/main/resources/application.properties`

3. Execute o backend:
```bash
mvn spring-boot:run
```

O servidor estará disponível em `http://localhost:8080`

### Frontend

1. Navegue até a pasta do frontend:
```bash
cd algamoney-ui
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o frontend:
```bash
npm start
```

A aplicação estará disponível em `http://localhost:4200`

## API

A documentação da API está disponível através do Swagger UI:
```
http://localhost:8080/swagger-ui.html
```

### Principais Endpoints
- `/auth` - Autenticação
- `/lancamentos` - Gerenciamento de lançamentos
- `/pessoas` - Gerenciamento de pessoas
- `/categorias` - Gerenciamento de categorias

## Contribuindo

1. Faça o fork do projeto
2. Crie sua feature branch (`git checkout -b feature/NovaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/NovaFeature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

---

<div align="center">

 Se este projeto te ajudou, considere dar uma estrela!

[ Voltar ao topo](#algamoney)

</div>
