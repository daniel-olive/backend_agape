import { Conteudo } from "../../../../../modules/conteudo/domain/conteudo.entity";
import { IConteudoRepository } from "../../../../../modules/conteudo/domain/conteudo.repository.interface"; 
import { RecuperarConteudoProps } from "../../../../../modules/conteudo/domain/conteudo.types";
import { IUseCase } from "../../../../../shared/application/use-case.interface";
import { ConteudoApplicationExceptions } from "../../conteudo.application.exception";
import fs from 'fs';
import path from 'path';

class AtualizarConteudoUseCase implements IUseCase<RecuperarConteudoProps, boolean> {
    private _conteudoRepositorio: IConteudoRepository<Conteudo>;

    constructor(repositorio: IConteudoRepository<Conteudo>){
        this._conteudoRepositorio = repositorio;
    }

    async execute(conteudoProps: RecuperarConteudoProps): Promise<boolean> {
        const existeConteudo: boolean = await this._conteudoRepositorio.existe(conteudoProps.id);

        if (!existeConteudo) {
            throw new ConteudoApplicationExceptions.ConteudoNaoEncontrado();
        }

        // Recupera o conteúdo atual para obter o caminho do banner antigo
        const conteudoAtual = await this._conteudoRepositorio.recuperarPorUuid(conteudoProps.id);

        // Verifica se o conteúdo foi recuperado corretamente (não é nulo)
        if (!conteudoAtual) {
            throw new ConteudoApplicationExceptions.ConteudoNaoEncontrado(); // ou outra exceção adequada
        }

        // Manter o banner atual se um novo não for fornecido
        let bannerToUpdate = conteudoAtual.banner;
        if (conteudoProps.banner) {
            if (typeof conteudoAtual.banner === 'string') {
                this.deletarArquivo(conteudoAtual.banner);
            }
            bannerToUpdate = conteudoProps.banner; // Atualiza para o novo banner
        }

        // Atualiza o conteúdo com o banner correto
        const conteudo: Conteudo = Conteudo.recuperar({ ...conteudoProps, banner: bannerToUpdate });
        const atualizouConteudo: boolean = await this._conteudoRepositorio.atualizar(conteudo.id, conteudo);

        return atualizouConteudo;
    }

    // Função para deletar o arquivo
    private deletarArquivo(caminhoArquivo: string): void {
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

export { AtualizarConteudoUseCase }
