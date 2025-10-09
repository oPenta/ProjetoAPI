import { DataSource } from "typeorm";
import { Products } from "../entity/Products.js";
import { ProductCategories } from "../entity/ProductCategories.js";
import { ProductSituations } from "../entity/ProductSituations.js";

export default class CreateProductsSeeds {
    public async run(dataSource: DataSource): Promise<void> {
        console.log("Iniciando o seed para a tabela 'products'...");

        const productsRepo = dataSource.getRepository(Products);
        
        if (await productsRepo.count() > 0) {
            console.log("A tabela 'products' já possui dados. Nenhuma alteração foi realizada.");
            return;
        }

        const categoriesRepo = dataSource.getRepository(ProductCategories);
        const situationsRepo = dataSource.getRepository(ProductSituations);

        const categories = await categoriesRepo.find();
        const situations = await situationsRepo.find();

        if (categories.length === 0 || situations.length === 0) {
            console.error("ERRO: É necessário ter categorias e situações cadastradas para popular os produtos. Rode os outros seeds primeiro.");
            return;
        }

        const products = [
            { 
                name: "Notebook Gamer Pro", 
                productCategoryId: categories[0].id, 
                productSituationId: situations[0].id  
            },
            { 
                name: "Camiseta Básica", 
                productCategoryId: categories[1].id,
                productSituationId: situations[0].id
            },
            { 
                name: "O Senhor dos Anéis", 
                productCategoryId: categories[2].id, 
                productSituationId: situations[2].id  
            },
            { 
                name: "Fritadeira Elétrica", 
                productCategoryId: categories[3].id,
                productSituationId: situations[1].id
            }
        ];

        await productsRepo.save(products);

        console.log("Seed concluído com sucesso: produtos cadastrados.");
    }
}