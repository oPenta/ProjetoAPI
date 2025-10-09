import { DataSource } from "typeorm"
import { Situations } from "../entity/Situations.js"
import type { promises } from "dns"

export default class CreateSituationsSeeds {

    public async run (dataSource: DataSource ):Promise<void>{
        console.log("Iniciando o seed para a tabela 'situation'... ")
        
        const situationsRepository = dataSource.getRepository(Situations);
        const existingCount = await situationsRepository.count()
    
        if(existingCount >0){
            console.log("A tabela 'situations' ja existe dados. Nenhuma alteração foi realizada.")
            return
        }
        const situations = [
            {nameSituation: "Ativo"},
            {nameSituation: "Inativo"},
            {nameSituation: "Pendente"},
        ]

        await situationsRepository.save(situations)

        console.log("Seed concluida com sucesso: situações cadastradas.")
    
    }

}