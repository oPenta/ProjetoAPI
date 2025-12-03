# API Node.js com TypeORM e PostgreSQL

Esta é uma API RESTful robusta desenvolvida para gerenciamento de usuários e produtos, contando com autenticação segura, controle de acesso e recuperação de senha.

## Tecnologias Utilizadas

-   **Node.js** e **Express**
-   **TypeScript**
-   **TypeORM** (PostgreSQL)
-   **JWT** (Autenticação)
-   **Bcrypt** (Criptografia de senhas)
-   **Nodemailer** (Envio de e-mails)
-   **Yup** (Validação de dados)


## COMO RODAR O PROJETO

### 1-Instalar as dependências

```bash
npm install
```

### 2-Criar o arquivo `.env` e adicionar suas informações do PostgreSQL

### 3-Compilar o projeto

```bash
npm run build
```

### 4-Rodar as migrations para criar as tabelas

```bash
npx typeorm migration:run -d dist/data-source.js
```

### 5-(Opcional) Rodar os seeds para popular o banco

```bash
node dist/run-seeds.js
```

### 6-Iniciar o servidor em modo de desenvolvimento

```bash
npm run start:watch
```