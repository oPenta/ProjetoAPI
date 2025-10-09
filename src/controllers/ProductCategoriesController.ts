import express from 'express';
import type { Request, Response } from 'express';
import { AppDataSource } from '../data-source.js';
import { ProductCategories } from '../entity/ProductCategories.js';
import { PaginationService } from '../services/PaginationService.js';

const router = express.Router();

// Listar
router.get("/product-categories", async (req: Request, res: Response) => {
    try {
        const repository = AppDataSource.getRepository(ProductCategories);
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const result = await PaginationService.paginate(repository, page, limit, { id: "ASC" });
        
        return res.status(200).json({
            result
        });
    } catch (error) {
        console.error("Erro ao listar categorias de produto:", error);
        return res.status(500).json({ 
            mensagem: "Erro ao listar as categorias de produto." 
        });
    }
});

// Visualizar
router.get("/product-categories/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const repository = AppDataSource.getRepository(ProductCategories);
        const category = await repository.findOneBy({ id: parseInt(id) });

        if (!category) {
            res.status(404).json({
                mensagem: "Categoria de produto não encontrada." 
            });
            return;
        }
        
        res.status(200).json({ data: category });
        return;

    } catch (error) {
        console.error("Erro ao visualizar categoria de produto:", error);
        res.status(500).json({
            mensagem: "Erro ao visualizar a categoria de produto." 
        });
        return;
    }
});

// Atualizar
router.put("/product-categories/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const repository = AppDataSource.getRepository(ProductCategories);
        const category = await repository.findOneBy({ id: parseInt(id) });

        if (!category) {
            res.status(404).json({
                mensagem: "Categoria de produto não encontrada." 
            });
            return;
        }

        repository.merge(category, data);
        const updatedCategory = await repository.save(category);

        res.status(201).json({
            mensagem: "Categoria de produto atualizada com sucesso.",
            category: updatedCategory,
        });

    } catch (error) {
        console.error("Erro ao editar categoria de produto:", error);
        res.status(500).json({
            mensagem: "Erro ao editar a categoria de produto." 
        });
        return;
    }
});

// Deletar
router.delete("/product-categories/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const repository = AppDataSource.getRepository(ProductCategories);
        const category = await repository.findOneBy({ id: parseInt(id) });

        if (!category) {
            res.status(404).json({
                mensagem: "Categoria de produto não encontrada." 
            });
            return;
        }

        await repository.remove(category);

        res.status(200).json({
            mensagem: "Categoria de produto removida com sucesso.",
        });

    } catch (error) {
        console.error("Erro ao remover categoria de produto:", error);
        res.status(500).json({
            mensagem: "Erro ao remover a categoria de produto." 
        });
        return;
    }
});

// Cadastrar
router.post("/product-categories", async (req: Request, res: Response) => {
    try {
        const { name } = req.body;
        
        if (!name) {
            return res.status(400).json({ mensagem: "O campo 'name' é obrigatório." });
        }

        const repository = AppDataSource.getRepository(ProductCategories);
        const newCategory = repository.create({ name });
        await repository.save(newCategory);

        return res.status(201).json({
            mensagem: "Categoria de produto cadastrada com sucesso",
            category: newCategory,
        });

    } catch(error) {
        console.error("Erro ao cadastrar categoria de produto:", error);
        return res.status(500).json({
            mensagem: "Erro interno ao cadastrar a categoria de produto.",
        });
    }
});

export default router;