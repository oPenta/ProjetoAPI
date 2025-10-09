# Projeto Node.js com TypeORM

Guia completo de instalação, configuração e execução do projeto.

---

## Compilação e Execução

### Compilar o arquivo TypeScript

```bash
npx tsc
```

ou

```bash
npm run build
```

### Executar o arquivo gerado com Node.js

```bash
node dist/index.js
```

### Executar em modo de desenvolvimento (watch)

```bash
npm run start:watch
```

### Criar as tabelas do Banco de Dados com migrations

```bash
npx typeorm migration:run -d dist/data-source.js
```

### Executar as seeds (popular o banco)

```bash
node dist/run-seeds.js
```

---

## COMO RODAR O PROJETO

### 1-Instalar as dependências

```bash
npm install
```

### 2-Criar o arquivo `.env` e adicionar suas informações do PostgreSQL

```bash
copy .env.example .env
```

### 3-Compilar o projeto

```bash
npm run build
```

ou

```bash
npx tsc
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

---

## TESTES COM POSTMAN

### Variável de Ambiente

Crie uma variável `{{host}}` com o valor:

```
http://localhost:8080
```

---

### ➕ CREATE (POST)

#### Endpoint: `{{host}}/product-categories`

**Body:**

```json
{
    "name": "Livros e Papelaria"
}
```

#### Endpoint: `{{host}}/product-situations`

**Body:**

```json
{
    "name": "Sob Encomenda"
}
```

#### Endpoint: `{{host}}/products`

**Body:**

```json
{
    "name": "Caderno Universitário",
    "productCategoryId": 3,
    "productSituationId": 3
}
```

---

### 📋 LIST (GET)

```
{{host}}/product-categories?page=1&limit=5
{{host}}/product-situations?page=1&limit=5
{{host}}/products?page=1&limit=5
```

---

### 🔍 VIEW (GET)

```
{{host}}/product-categories/1
{{host}}/product-situations/1
{{host}}/products/1
```

---

### ✏️ EDIT (PUT)

#### Endpoint: `{{host}}/product-categories/1`

**Body:**

```json
{
    "name": "Livros, Revistas e Papelaria"
}
```

#### Endpoint: `{{host}}/product-situations/1`

**Body:**

```json
{
    "name": "Caderno Universitário Capa Dura"
}
```

#### Endpoint: `{{host}}/products/1`

**Body:**

```json
{
    "name": "Pc gamer"
}
```

---

### ❌ DELETE (DELETE)

```
{{host}}/product-categories/1
{{host}}/product-situations/1
{{host}}/products/1
```

---
