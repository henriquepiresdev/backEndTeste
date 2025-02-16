# Projeto Back-End com NestJS e PostgreSQL

## Pré-requisitos

- Docker (caso queira rodar dentro do Docker)
- Docker Compose (caso queira rodar dentro do Docker)
- Node.js (caso queira rodar fora do Docker)
- npm (caso queira rodar fora do Docker)
- PostgreSQL (caso queira rodar fora do Docker)

## Passos para Iniciar o Projeto

### Rodando a Aplicação Dentro do Docker

Para rodar a aplicação com Docker, siga os passos abaixo:

#### 1. Clonando o Repositório

Clone o repositório para a sua máquina local:

```bash
git clone https://github.com/henriquepiresdev/backEndTeste.git
cd backEndTeste
```

#### 2. Configurando as Variáveis de Ambiente

Crie um arquivo .env na raiz do projeto com as seguintes variáveis:
```env
NODE_ENV=development
PORT=3000
DEBUG=nestjs:*

POSTGRES_HOST=db
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=12345678
POSTGRES_DB=testeTecnico

TYPEORM_CONNECTION=postgres
TYPEORM_ENTITIES=dist/**/*.entity.js
TYPEORM_MIGRATIONS=dist/migrations/*.js
TYPEORM_MIGRATIONS_RUN=true
TYPEORM_SYNCHRONIZE=false
TYPEORM_LOGGING=true

```

Importante: O arquivo .env não deve ser versionado no Git.

#### 3. Rodando os Containers com Docker Compose

Com o arquivo .env configurado, execute o seguinte comando para construir as imagens do Docker e rodar os containers:

```bash
docker-compose up --build -d
```

Este comando vai:
Criar as imagens e iniciar os containers para o PostgreSQL e o NestJS.
Rodar a aplicação no modo de desenvolvimento.
Aplicar automaticamente as migrações do banco de dados.

#### 4. Acessando a Aplicação

Com os containers em funcionamento, a aplicação estará acessível em <http://localhost:3000>, e o banco de dados estará rodando no localhost:5432.

### Rodando a Aplicação Fora do Docker

Caso queira rodar a aplicação localmente (fora do Docker), siga os passos abaixo:



## 🚀 Como rodar o projeto sem Docker

### 1️⃣ Clonando o Repositório

Clone o repositório para sua máquina local:

```bash
git clone https://github.com/henriquepiresdev/backEndTeste.git
cd backEndTeste
````

#### 2. Instale as Dependências

Dentro da pasta do projeto, execute:

```bash
npm install
 ```

#### 3. Criando o Banco de Dados Localmente (PostgreSQL)

Certifique-se de ter o PostgreSQL instalado localmente. Caso ainda não tenha, baixe e instale o PostgreSQL.

Depois, crie o banco de dados testeTecnico:

```bash
psql -U postgres
```

Após entrar no psql, execute:

```bash
CREATE DATABASE testeTecnico;
 ```

#### 4. Configurando as Variáveis de Ambiente

Crie o arquivo .env na raiz do projeto com a seguinte variável:

```env
NODE_ENV=development
PORT=3000
DEBUG=nestjs:*

POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=12345678
POSTGRES_DB=testeTecnico

TYPEORM_CONNECTION=postgres
TYPEORM_ENTITIES=dist/**/*.entity.js
TYPEORM_MIGRATIONS=dist/migrations/*.js
TYPEORM_MIGRATIONS_RUN=true
TYPEORM_SYNCHRONIZE=false
TYPEORM_LOGGING=true
```

Importante: O arquivo .env não deve ser versionado no Git.

#### 5. Rodando as Migrações

Com o banco de dados criado, execute o comando para rodar as migrações:

```bash
npx typeorm migration:run --dataSource dist/config/typeorm.config.js
 ```

Este comando irá aplicar as migrações e gerar o cliente Prisma.

#### 6. Rodando a Aplicação

Agora, para rodar a aplicação, execute o comando:

```bash
npm run start:dev
 ```

A aplicação estará acessível em <http://localhost:3000>, e o banco de dados estará rodando no localhost:5432.

### Considerações Finais

Lembre-se de não versionar o arquivo .env no Git.
Se você estiver rodando a aplicação fora do Docker, o banco de dados PostgreSQL precisa estar instalado e rodando localmente.
Se tiver problemas com a migração ou o banco de dados, verifique se o PostgreSQL está rodando corretamente e se a URL de conexão no .env está correta.
