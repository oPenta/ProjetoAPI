import express from 'express';
import type { Request, Response } from 'express';
import { AppDataSource } from '../data-source.js';
import { ProductSituations } from '../entity/ProductSituations.js';
import { PaginationService } from '../services/PaginationService.js';

const router = express.Router();

// Listar
router.get("/product-situations", async (req: Request, res: Response) => {
    try {
        const repository = AppDataSource.getRepository(ProductSituations);
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const result = await PaginationService.paginate(repository, page, limit, { id: "ASC" });
        
        return res.status(200).json({
            result
        });
    } catch (error) {
        console.error("Erro ao listar situações de produto:", error);
        return res.status(500).json({ 
            mensagem: "Erro ao listar as situações de produto." 
        });
    }
});

// Visualizar
router.get("/product-situations/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const repository = AppDataSource.getRepository(ProductSituations);
        const situation = await repository.findOneBy({ id: parseInt(id) });

        if (!situation) {
            res.status(404).json({
                mensagem: "Situação de produto não encontrada." 
            });
            return;
        }
        
        res.status(200).json({ data: situation });
        return;

    } catch (error) {
        console.error("Erro ao visualizar situação de produto:", error);
        res.status(500).json({
            mensagem: "Erro ao visualizar a situação de produto." 
        });
        return;
    }
});

// Atualizar
router.put("/product-situations/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const repository = AppDataSource.getRepository(ProductSituations);
        const situation = await repository.findOneBy({ id: parseInt(id) });

        if (!situation) {
            res.status(404).json({
                mensagem: "Situação de produto não encontrada." 
            });
            return;
        }

        repository.merge(situation, data);
        const updatedSituation = await repository.save(situation);

        res.status(201).json({
            mensagem: "Situação de produto atualizada com sucesso.",
            situation: updatedSituation,
        });

    } catch (error) {
        console.error("Erro ao editar situação de produto:", error);
        res.status(500).json({
            mensagem: "Erro ao editar a situação de produto." 
        });
        return;
    }
});

// Deletar
router.delete("/product-situations/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const repository = AppDataSource.getRepository(ProductSituations);
        const situation = await repository.findOneBy({ id: parseInt(id) });

        if (!situation) {
            res.status(404).json({
                mensagem: "Situação de produto não encontrada." 
            });
            return;
        }

        await repository.remove(situation);

        res.status(200).json({
            mensagem: "Situação de produto removida com sucesso.",
        });

    } catch (error) {
        console.error("Erro ao remover situação de produto:", error);
        res.status(500).json({
            mensagem: "Erro ao remover a situação de produto." 
        });
        return;
    }
});

// Cadastrar
router.post("/product-situations", async (req: Request, res: Response) => {
    try {
        const { name } = req.body;
        
        if (!name) {
            return res.status(400).json({ mensagem: "O campo 'name' é obrigatório." });
        }

        const repository = AppDataSource.getRepository(ProductSituations);
        const newSituation = repository.create({ name });
        await repository.save(newSituation);

        return res.status(201).json({
            mensagem: "Situação de produto cadastrada com sucesso",
            situation: newSituation,
        });

    } catch(error) {
        console.error("Erro ao cadastrar situação de produto:", error);
        return res.status(500).json({
            mensagem: "Erro interno ao cadastrar a situação de produto.",
        });
    }
});

export default router;