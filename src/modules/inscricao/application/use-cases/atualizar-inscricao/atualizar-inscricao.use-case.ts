import { Inscricao } from "../../../../../modules/inscricao/domain/inscricao.entity";
import { IInscricaoRepository } from "../../../../../modules/inscricao/domain/inscricao.repository.interface";
import { RecuperarInscricaoProps } from "../../../../../modules/inscricao/domain/inscricao.types";
import { IUseCase } from "../../../../../shared/application/use-case.interface";
import { InscricaoApplicationExceptions } from "../../inscricao.application.exception";



class AtualizarInscricaoUseCase implements IUseCase<RecuperarInscricaoProps, boolean> {
    private _inscricaoRepositorio: IInscricaoRepository<Inscricao>;

    constructor(repositorio: IInscricaoRepository<Inscricao>){
        this._inscricaoRepositorio = repositorio;
    }

    async execute(inscricaoProps: RecuperarInscricaoProps): Promise<boolean> {

        const existeInscricao: boolean = await this._inscricaoRepositorio.existe(inscricaoProps.id);

        if (!existeInscricao){
            throw new InscricaoApplicationExceptions.InscricaoNaoEncontrada();
        }

        const inscricao: Inscricao = Inscricao.recuperar(inscricaoProps);

        const atualizouInscricao: boolean = await this._inscricaoRepositorio.atualizar(inscricao.id, inscricao);

        return atualizouInscricao;

    }

}

export { AtualizarInscricaoUseCase }