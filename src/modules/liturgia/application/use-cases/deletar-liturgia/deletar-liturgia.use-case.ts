import { IUseCase } from "../../../../../shared/application/use-case.interface";
import { LiturgiaApplicationExceptions } from "../../liturgia.application.exception";
import { ILiturgiaRepository } from "../../../../../modules/liturgia/domain/liturgia.repository.interface";
import { Liturgia } from "../../../../../modules/liturgia/domain/liturgia.entity";



class DeletarLiturgiaUseCase implements IUseCase<string,boolean> {
    private _liturgiaRepositorio: ILiturgiaRepository<Liturgia>;

    constructor(repositorio: ILiturgiaRepository<Liturgia>){
        this._liturgiaRepositorio = repositorio;
    }

    async execute(uuid: string): Promise<boolean> {

        const existeLiturgia: boolean = await this._liturgiaRepositorio.existe(uuid);

        if (!existeLiturgia){
            throw new LiturgiaApplicationExceptions.LiturgiaNaoEncontrada();
        }

        const deletouLiturgia:boolean = await this._liturgiaRepositorio.deletar(uuid);

        return deletouLiturgia;

    }

}

export { DeletarLiturgiaUseCase }