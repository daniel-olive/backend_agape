
import { Liturgia } from "../../../../../modules/liturgia/domain/liturgia.entity";
import { ILiturgiaRepository } from "../../../../../modules/liturgia/domain/liturgia.repository.interface";
import { CriarLiturgiaProps, ILiturgia } from "../../../../../modules/liturgia/domain/liturgia.types";
import { LiturgiaMap } from "../../../../../modules/liturgia/infra/mappers/liturgia.map";
import { IUseCase } from "../../../../../shared/application/use-case.interface";

class InserirLiturgiaUseCase implements IUseCase<CriarLiturgiaProps,ILiturgia> {
    private _liturgiaRepositorio: ILiturgiaRepository<Liturgia>;

    constructor(repositorio: ILiturgiaRepository<Liturgia>){
        this._liturgiaRepositorio = repositorio;
    }

    async execute(liturgiaProps: CriarLiturgiaProps): Promise<ILiturgia> {
       
        const liturgia: Liturgia = Liturgia.criar(liturgiaProps);

        const liturgiaInserida = await this._liturgiaRepositorio.inserir(liturgia);

        return LiturgiaMap.toDTO(liturgiaInserida);
    }
}

export { InserirLiturgiaUseCase }
