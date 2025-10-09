Compilação e Execução
Compilar o arquivo TypeScript:

npx tsc

npm run build

Executar arquivo gerado com node.js:

node dist/index.js

Executar com o watch (modo de desenvolvimento):

npm run start:watch

Criar as tabelas do Banco de Dados com migrations:

npx typeorm migration:run -d dist/data-source.js

Executar as seeds (popular o banco):

node dist/run-seeds.js

COMO RODAR O PROJETO
Instale as dependências:

npm install

Crie o arquivo .env e adicione suas informações do PostgreSQL:

copy .env.example .env

Compile o projeto:

npm run build ou npx tsc

Rode as migrations para criar as tabelas:

npx typeorm migration:run -d dist/data-source.js

(Opcional) Rode os seeds para popular o banco:

node dist/run-seeds.js

Inicie o servidor em modo de desenvolvimento:

npm run start:watch

TESTES COM POSTMAN
Variável de Ambiente: Crie uma variável {{host}} com o valor http://localhost:8080.

CREATE (POST)
Endpoint: {{host}}/product-categories

Body:

{
    "name": "Livros e Papelaria"
}

Endpoint: {{host}}/product-situations

Body:

{
    "name": "Sob Encomenda"
}

Endpoint: {{host}}/products

Body:

{
    "name": "Caderno Universitário",
    "productCategoryId": 3,
    "productSituationId": 3
}

LIST (GET)
{{host}}/product-categories?page=1&limit=5
{{host}}/product-situations?page=1&limit=5
{{host}}/products?page=1&limit=5

VIEW (GET)
{{host}}/product-categories/1
{{host}}/product-situations/1
{{host}}/products/1

EDIT (PUT)
Endpoint: {{host}}/product-categories/1

Body:

{
    "name": "Livros, Revistas e Papelaria"
}

Endpoint: {{host}}/product-situations/1

Body:

{
    "name": "Caderno Universitário Capa Dura"
}

Endpoint: {{host}}/products/1

Body:

{
    "name": "Pc gamer"
}

DELETE (DELETE)
{{host}}/product-categories/1
{{host}}/product-situations/1
{{host}}/products/1
