
import { Inscricao } from "../../../../../modules/inscricao/domain/inscricao.entity";
import { IInscricaoRepository } from "../../../../../modules/inscricao/domain/inscricao.repository.interface";
import { CriarInscricaoProps, IInscricao } from "../../../../../modules/inscricao/domain/inscricao.types";
import { InscricaoMap } from "../../../../../modules/inscricao/infra/mappers/inscricao.map";
import { IUseCase } from "../../../../../shared/application/use-case.interface";

class InserirInscricaoUseCase implements IUseCase<CriarInscricaoProps,IInscricao> {
    private _inscricaoRepositorio: IInscricaoRepository<Inscricao>;

    constructor(repositorio: IInscricaoRepository<Inscricao>){
        this._inscricaoRepositorio = repositorio;
    }

    async execute(inscricaoProps: CriarInscricaoProps): Promise<IInscricao> {
       
        const inscricao: Inscricao = Inscricao.criar(inscricaoProps);

        const inscricaoInserida = await this._inscricaoRepositorio.inserir(inscricao);

        return InscricaoMap.toDTO(inscricaoInserida);
    }
}

export { InserirInscricaoUseCase }
