import { IUseCase } from "../../../../../shared/application/use-case.interface";
import { InscricaoApplicationExceptions } from "../../inscricao.application.exception";
import { Inscricao } from "../../../../../modules/inscricao/domain/inscricao.entity";
import { IInscricaoRepository } from "../../../../../modules/inscricao/domain/inscricao.repository.interface";




class DeletarInscricaoUseCase implements IUseCase<string,boolean> {
    private _inscricaoRepositorio: IInscricaoRepository<Inscricao>;

    constructor(repositorio: IInscricaoRepository<Inscricao>){
        this._inscricaoRepositorio = repositorio;
    }

    async execute(uuid: string): Promise<boolean> {

        const existeInscricao: boolean = await this._inscricaoRepositorio.existe(uuid);

        if (!existeInscricao){
            throw new InscricaoApplicationExceptions.InscricaoNaoEncontrada();
        }

        const deletouInscricao:boolean = await this._inscricaoRepositorio.deletar(uuid);

        return deletouInscricao;

    }

}

export { DeletarInscricaoUseCase }