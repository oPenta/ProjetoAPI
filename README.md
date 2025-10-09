Compilar o arquivo TypeScript:
npx tsc
npm run build

Execultar arquivo gerado com node.js:
node dist/index.js

Para execultar com o watch:
npm run start:watch

Criar as tabelas do Banco de dados com migrations
npx typeorm migration:run -d dist/data-source.js

Execultar as seeds
node dist/run-seeds.js




COMO RODAR:
npm install
copy .env.example .env  =====//COLOCAR SUAS INFORMAÇÕES DO POSTGRES\\=====
npm run build ou npx tsc
npx typeorm migration:run -d dist/data-source.js
node dist/run-seeds.js
npm run start:watch   





{{host}} tem que criar o variable para http://localhost:8080

POSTMAN CREATE:
{{host}}/product-categories
{
    "name": "Livros e Papelaria"
}

{{host}}/product-situations
{
    "name": "Sob Encomenda"
}

{{host}}/products
{
    "name": "Caderno Universitário",
    "productCategoryId": 3,
    "productSituationId": 3
}


POSTMAN LIST:
{{host}}/product-categories?page=1&limit=5
{{host}}/product-situations?page=1&limit=5
{{host}}/products?page=1&limit=5


POSTMAN VIEW
{{host}}/product-categories/1
{{host}}/product-situations/1
{{host}}/products/1


POSTMAN EDIT
{{host}}/product-categories/1
{
    "name": "Livros, Revistas e Papelaria"
}

{{host}}/product-situations/1
{
    "name": "Caderno Universitário Capa Dura"
}

{{host}}/products/1
{
    "name": "Pc gamer"
}


POSTMAN DELETE
{{host}}/product-categories/1
{{host}}/product-situations/1
{{host}}/products/1