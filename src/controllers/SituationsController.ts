import express from 'express';
import type { Request, Response } from 'express';
import { AppDataSource } from '../data-source.js';
import { Situations } from '../entity/Situations.js';
import { PaginationService } from '../services/PaginationService.js';

const router = express.Router();

//CRIAR A LISTA
router.get("/situations", async (req: Request, res: Response) => {
    try {
        const situationsRepository = AppDataSource.getRepository(Situations);
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const result = await PaginationService.paginate(situationsRepository,page, limit, {id: "DESC"})
        
        return res.status(200).json({
            result
        });
        return;

    } catch (error) {
        console.error("Erro ao listar situations:", error);
        return res.status(500).json({ 
            mensagem: "Erro ao listar as situações." });
    }
});

//VISUALIZAÇÃO
router.get("/situations/:id", async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const situationsRepository = AppDataSource.getRepository(Situations);
        const situation = await situationsRepository.findOneBy({id: parseInt(id)});

        if(!situation){
            res.status(404).json({
                 mensagem: "Situação não encontrada." 
                });
            return
        }

        
        res.status(200).json({data: situation});
        return 

    } catch (error) {
        console.error("Erro ao visualizar situations:", error);
        res.status(500).json({
            mensagem: "Erro ao visualizar as situações." 
            });
            return
    }
});

//ATUALIZAR, EDITAR
router.put("/situations/:id", async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        var data = req.body;
        const situationsRepository = AppDataSource.getRepository(Situations);
        const situation = await situationsRepository.findOneBy({id: parseInt(id)});

        if(!situation){
            res.status(404).json({
                 mensagem: "Situação não encontrada." 
                });
            return
        }

        situationsRepository.merge(situation, data)

        const updateSituation = await situationsRepository.save(situation)

        res.status(201).json({
            mensagem: "Situação Atualizada com sucesso.",
            situation: updateSituation,
        });


    } catch (error) {
        console.error("Erro ao editar situations:", error);
        res.status(500).json({
            mensagem: "Erro ao editar as situações." 
            });
            return
    }
});


//DELETE, REMOÇÃO
router.delete("/situations/:id", async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const situationsRepository = AppDataSource.getRepository(Situations);
        const situation = await situationsRepository.findOneBy({id: parseInt(id)});

        if(!situation){
            res.status(404).json({
                 mensagem: "Situação não encontrada." 
                });
            return
        }

        await situationsRepository.remove(situation,)

        res.status(200).json({
            mensagem: "Situação Removida com sucesso.",
        });


    } catch (error) {
        console.error("Erro ao editar situations:", error);
        res.status(500).json({
            mensagem: "Erro ao editar as situações." 
            });
            return
    }
});
//CRIAR A ROTA POST, CADASTRAR
router.post("/situations", async (req: Request, res: Response) => {
    try {
        const { nameSituation } = req.body; 
        
        if (!nameSituation) {
            return res.status(400).json({ mensagem: "O campo 'nameSituation' é obrigatório." });
        }

        const situationsRepository = AppDataSource.getRepository(Situations);
        const newSituation = situationsRepository.create({ nameSituation });

        await situationsRepository.save(newSituation);

        return res.status(201).json({
            mensagem: "Situação cadastrada com sucesso",
            situation: newSituation,
        });

    } catch(error) {
        console.error("Erro ao cadastrar situation:", error);
        return res.status(500).json({
            mensagem: "Erro interno ao cadastrar a situação.",
        });
    }
});

export default router;