import { DataSource } from "typeorm";
import { ProductCategories } from "../entity/ProductCategories.js";

export default class CreateProductCategoriesSeeds {
    public async run(dataSource: DataSource): Promise<void> {
        console.log("Iniciando o seed para a tabela 'product_categories'...");
        
        const repository = dataSource.getRepository(ProductCategories);
        const existingCount = await repository.count();
    
        if (existingCount > 0) {
            console.log("A tabela 'product_categories' já possui dados. Nenhuma alteração foi realizada.");
            return;
        }

        const categories = [
            { name: "Eletrônicos" },
            { name: "Vestuário" },
            { name: "Livros" },
            { name: "Casa e Cozinha" },
        ];

        await repository.save(categories);

        console.log("Seed concluído com sucesso: categorias de produto cadastradas.");
    }
}