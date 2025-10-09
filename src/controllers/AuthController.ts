import express from 'express';
import type { Request, Response } from 'express';

const router = express.Router();

router.get("/", (req:Request, res:Response) => {
    res.send("Bem-vindo à rota principal da API!");
});

export default router;