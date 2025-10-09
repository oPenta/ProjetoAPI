import express from 'express';
import type { Request, Response } from 'express';
import { AppDataSource } from '../data-source.js';
import { Products } from '../entity/Products.js';
import { PaginationService } from '../services/PaginationService.js';

const router = express.Router();

// Listar
router.get("/products", async (req: Request, res: Response) => {
    try {
        const repository = AppDataSource.getRepository(Products);
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const result = await PaginationService.paginate(repository, page, limit, { id: "ASC" });
        
        return res.status(200).json({
            result
        });
    } catch (error) {
        console.error("Erro ao listar produtos:", error);
        return res.status(500).json({ 
            mensagem: "Erro ao listar os produtos." 
        });
    }
});

// Visualizar
router.get("/products/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const repository = AppDataSource.getRepository(Products);
        const product = await repository.findOne({
            where: { id: parseInt(id) },
            relations: ["productCategory", "productSituation"]
        });

        if (!product) {
            res.status(404).json({
                mensagem: "Produto não encontrado." 
            });
            return;
        }
        
        res.status(200).json({ data: product });
        return;

    } catch (error) {
        console.error("Erro ao visualizar produto:", error);
        res.status(500).json({
            mensagem: "Erro ao visualizar o produto." 
        });
        return;
    }
});

// Atualizar
router.put("/products/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const repository = AppDataSource.getRepository(Products);
        const product = await repository.findOneBy({ id: parseInt(id) });

        if (!product) {
            res.status(404).json({
                mensagem: "Produto não encontrado." 
            });
            return;
        }

        repository.merge(product, data);
        const updatedProduct = await repository.save(product);

        res.status(201).json({
            mensagem: "Produto atualizado com sucesso.",
            product: updatedProduct,
        });

    } catch (error) {
        console.error("Erro ao editar produto:", error);
        res.status(500).json({
            mensagem: "Erro ao editar o produto." 
        });
        return;
    }
});

// Deletar
router.delete("/products/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const repository = AppDataSource.getRepository(Products);
        const product = await repository.findOneBy({ id: parseInt(id) });

        if (!product) {
            res.status(404).json({
                mensagem: "Produto não encontrado." 
            });
            return;
        }

        await repository.remove(product);

        res.status(200).json({
            mensagem: "Produto removido com sucesso.",
        });

    } catch (error) {
        console.error("Erro ao remover produto:", error);
        res.status(500).json({
            mensagem: "Erro ao remover o produto." 
        });
        return;
    }
});

// Cadastrar
router.post("/products", async (req: Request, res: Response) => {
    try {
        const { name, productCategoryId, productSituationId } = req.body;
        
        if (!name || !productCategoryId || !productSituationId) {
            return res.status(400).json({ mensagem: "Os campos 'name', 'productCategoryId' e 'productSituationId' são obrigatórios." });
        }

        const repository = AppDataSource.getRepository(Products);
        const newProduct = repository.create({ name, productCategoryId, productSituationId });
        await repository.save(newProduct);

        return res.status(201).json({
            mensagem: "Produto cadastrado com sucesso",
            product: newProduct,
        });

    } catch(error) {
        console.error("Erro ao cadastrar produto:", error);
        return res.status(500).json({
            mensagem: "Erro interno ao cadastrar o produto.",
        });
    }
});

export default router;