# Clinic User Management Microservice

O **Clinic User Management Microservice** é um microserviço dedicado à gestão de usuários para clínicas e instituições de saúde. Ele gerencia o cadastro, atualização e consulta de perfis (pacientes, médicos) e é desenvolvido utilizando os princípios do Domain-Driven Design (DDD) e da Clean Architecture, garantindo uma clara separação de responsabilidades entre as diferentes camadas do sistema.

## Sumário
- [Clinic User Management Microservice](#clinic-user-management-microservice)
  - [Sumário](#sumário)
  - [Sobre o Projeto](#sobre-o-projeto)
  - [Tecnologias Utilizadas](#tecnologias-utilizadas)
  - [Arquitetura](#arquitetura)
  - [Pré-requisitos](#pré-requisitos)
  - [Instalação e Configuração](#instalação-e-configuração)
  - [Rodando o Ambiente com Docker](#rodando-o-ambiente-com-docker)
  - [Scripts Útis](#scripts-útis)
  - [Licença](#licença)

## Sobre o Projeto

O *Clinic User Management Microservice* foi desenvolvido para oferecer uma solução robusta e escalável para a gestão de usuários no ambiente clínico. O serviço permite o registro e atualização de perfis, incluindo a gestão de credenciais utilizando value objects, e organiza seus componentes seguindo práticas modernas de engenharia de software.

## Tecnologias Utilizadas

- **Node.js** e **TypeScript** para desenvolvimento do backend.
- **Fastify** microframework web focado em ser extremamente rápido, leve e eficiente para criar APIs e aplicações HTTP.
- **TypeORM** para persistência e gerenciamento de banco de dados PostgreSQL.
- **Docker** e **Docker Compose** para containerização.
- **tsyringe** para injeção de dependências.

## Arquitetura

O projeto adota o modelo arquitetural baseado em **Domain-Driven Design (DDD)** combinado com **Clean Architecture**.  
As camadas principais são:

- **Domínio:** Define as regras de negócio, entidades, objetos de valor e repositórios.
- **Aplicação:** Orquestra os casos de uso, utilizando comandos, operações, DTOs e app services.
- **Infraestrutura:** Implementa detalhes técnicos como conexão com banco de dados (PostgreSQL via TypeORM) e configurações.
- **Interfaces:** Expõe APIs REST via controllers, rotas e serializers.

Essa separação proporciona alta coesão e baixo acoplamento, facilitando a manutenção e evolução do sistema.

## Pré-requisitos
- Docker (para execução via containers)

## Instalação e Configuração

1. **Clone o repositório**
   ```bash
   git clone https://github.com/seu-usuario/clinic-user-managment-ms.git
   cd clinic-user-managment-ms
   ```
   
2. **Configure o ambiente**

   Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

   ```env
   SERVER_PORT=3000
   SERVER_HOST=0.0.0.0
   BASE_URL=http://127.0.0.1:3000
   SCHEMA_VERSION=1.0.0
   DB_HOST=db
   DB_USER=admin
   DB_PASSWORD=p1c4d1nh0
   DB_PORT=5432
   DB_NAME=db-clinic-user-managment-ms
   ```

## Rodando o Ambiente com Docker

Para rodar a aplicação utilizando **Docker** e **Docker Compose**, basta executar o seguinte comando:

```bash
npm run docker:dev
```

Esse comando utiliza o `docker-compose.yml` para levantar os containers da aplicação e do banco de dados PostgreSQL.
As migrations serão executadas automaticamente ao iniciar o container da aplicação.
Acesse a aplicação em `http://127.0.0.1:3000/api/docs`.

## Scripts Útis

No arquivo `package.json`, você encontrará os seguintes scripts principais:

```json
"scripts": {
  "start": "node dist/index.js",
  "dev": "tsx watch src/index.ts",
  "build": "tsup src --out-dir dist",
  "typeorm": "tsx -r dotenv/config -r tsconfig-paths/register ./node_modules/typeorm/cli.js -d ./src/infra/config/dataSource.ts",
  "migration:create": "npx typeorm migration:create",
  "migration:run": "npx typeorm migration:run",
  "migration:revert": "npx typeorm migration:revert",
  "docker:dev": "NODE_ENV=development COMPOSE_BAKE=true docker compose -f docker-compose.dev.yml up --build",
}
```

- **start:** Inicia o servidor em modo de produção.
- **dev:** Inicia o servidor em modo de desenvolvimento com hot reload.
- **docker:dev:** Sobe os containers da aplicação e banco de dados.
- **typeorm:** Interface para executar comandos do TypeORM (como migration:run).

## Licença

Este projeto está licenciado sob a [Licença MIT](LICENSE).
