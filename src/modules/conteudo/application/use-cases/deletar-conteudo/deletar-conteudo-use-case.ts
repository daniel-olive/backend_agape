import fs from 'fs';
import path from 'path';
import { Conteudo } from "../../../../../modules/conteudo/domain/conteudo.entity";
import { IConteudoRepository } from "../../../../../modules/conteudo/domain/conteudo.repository.interface";
import { IUseCase } from "../../../../../shared/application/use-case.interface";
import { ConteudoApplicationExceptions } from "../../conteudo.application.exception";

class DeletarConteudoUseCase implements IUseCase<string, boolean> {
    private _conteudoRepositorio: IConteudoRepository<Conteudo>;

    constructor(repositorio: IConteudoRepository<Conteudo>) {
        this._conteudoRepositorio = repositorio;
    }

    async execute(uuid: string): Promise<boolean> {
        const existeConteudo: boolean = await this._conteudoRepositorio.existe(uuid);

        if (!existeConteudo) {
            throw new ConteudoApplicationExceptions.ConteudoNaoEncontrado();
        }

        const conteudo = await this._conteudoRepositorio.recuperarPorUuid(uuid);
        console.log('Conteúdo recuperado:', conteudo);

        if (conteudo?.banner) { 
            console.log('Banner encontrado:', conteudo.banner);
            this.deletarArquivo(conteudo.banner); 
        }

        if (conteudo && conteudo.banner) {  
            this.deletarArquivo(conteudo.banner);  
        }

        const deletouConteudo: boolean = await this._conteudoRepositorio.deletar(uuid);

        return deletouConteudo;
    }

    private deletarArquivo(caminhoArquivo: string): void {
        // Caminho completo para o arquivo na pasta uploads
        const caminhoCompleto = path.join(__dirname, '../../../../../main/presentation', caminhoArquivo); 
        
        fs.unlink(caminhoCompleto, (err) => {
            if (err) {
                console.error(`Erro ao deletar arquivo: ${caminhoArquivo}`, err);
            } else {
                console.log(`Arquivo deletado: ${caminhoArquivo}`);
            }
        });
    }
}

export { DeletarConteudoUseCase }
