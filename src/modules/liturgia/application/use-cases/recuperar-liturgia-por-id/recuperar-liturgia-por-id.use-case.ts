
import { IUseCase } from "../../../../../shared/application/use-case.interface";
import { ILiturgiaRepository } from "../../../../../modules/liturgia/domain/liturgia.repository.interface";
import { Liturgia } from "../../../../../modules/liturgia/domain/liturgia.entity";
import { ILiturgia } from "../../../../../modules/liturgia/domain/liturgia.types";
import { LiturgiaApplicationExceptions } from "../../liturgia.application.exception";
import { LiturgiaMap } from "../../../../../modules/liturgia/infra/mappers/liturgia.map";



class RecuperarLiturgiaPorIdUseCase implements IUseCase<string,ILiturgia> {

    private _liturgiaRepositorio: ILiturgiaRepository<Liturgia>;

    constructor(liturgiaRepositorio:ILiturgiaRepository<Liturgia>){
        this._liturgiaRepositorio = liturgiaRepositorio;
    }

    async execute(uuid: string): Promise<ILiturgia> {

        const existeLiturgia: boolean = await this._liturgiaRepositorio.existe(uuid);

        if (!existeLiturgia){
            throw new LiturgiaApplicationExceptions.LiturgiaNaoEncontrada();
        }

        const liturgia = await this._liturgiaRepositorio.recuperarPorUuid(uuid);

        return LiturgiaMap.toDTO(liturgia as Liturgia);

    }

}

export { RecuperarLiturgiaPorIdUseCase }