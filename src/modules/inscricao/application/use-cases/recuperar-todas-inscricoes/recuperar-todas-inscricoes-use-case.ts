
import { Inscricao } from "../../../../../modules/inscricao/domain/inscricao.entity";
import { IInscricaoRepository } from "../../../../../modules/inscricao/domain/inscricao.repository.interface";
import { IInscricao } from "../../../../../modules/inscricao/domain/inscricao.types";
import { InscricaoMap } from "../../../../../modules/inscricao/infra/mappers/inscricao.map";
import { IUseCase } from "../../../../../shared/application/use-case.interface";

class RecuperarTodasInscricoesUseCase implements IUseCase<void,Array<IInscricao>> {
    private _inscricaoRepositorio: IInscricaoRepository<Inscricao>;

    constructor(repositorio: IInscricaoRepository<Inscricao>){
        this._inscricaoRepositorio = repositorio;
    }

    async execute(): Promise<IInscricao[]> {

        const todasInscricoes: Array<Inscricao> = await this._inscricaoRepositorio.recuperarTodos();

        const todasInscricoesDTO = todasInscricoes.map(
            (inscricao) => InscricaoMap.toDTO(inscricao)
        );

        return todasInscricoesDTO;
    }

}

export { RecuperarTodasInscricoesUseCase }