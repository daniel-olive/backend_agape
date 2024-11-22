import { Liturgia } from "../../../../../modules/liturgia/domain/liturgia.entity";
import { IUseCase } from "../../../../../shared/application/use-case.interface";
import { LiturgiaApplicationExceptions } from "../../liturgia.application.exception";
import { RecuperarLiturgiaProps } from "../../../../../modules/liturgia/domain/liturgia.types";
import { ILiturgiaRepository } from "../../../../../modules/liturgia/domain/liturgia.repository.interface";



class AtualizarLiturgiaUseCase implements IUseCase<RecuperarLiturgiaProps, boolean> {
    private _liturgiaRepositorio: ILiturgiaRepository<Liturgia>;

    constructor(repositorio: ILiturgiaRepository<Liturgia>){
        this._liturgiaRepositorio = repositorio;
    }

    async execute(liturgiaProps: RecuperarLiturgiaProps): Promise<boolean> {

        const existeLiturgia: boolean = await this._liturgiaRepositorio.existe(liturgiaProps.id);

        if (!existeLiturgia){
            throw new LiturgiaApplicationExceptions.LiturgiaNaoEncontrada();
        }

        const liturgia: Liturgia = Liturgia.recuperar(liturgiaProps);

        const atualizouLiturgia: boolean = await this._liturgiaRepositorio.atualizar(liturgia.id, liturgia);

        return atualizouLiturgia;

    }

}

export { AtualizarLiturgiaUseCase }