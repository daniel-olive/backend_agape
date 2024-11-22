import { Categoria } from "../../../../../modules/categoria/domain/categoria.entity";
import { ICategoriaRepository } from "../../../../../modules/categoria/domain/categoria.repository.interface";
import { ICategoria } from "../../../../../modules/categoria/domain/categoria.types";
import { CategoriaMap } from "../../../../../modules/categoria/infra/mappers/categoria.map";
import { Liturgia } from "../../../../../modules/liturgia/domain/liturgia.entity";
import { ILiturgiaRepository } from "../../../../../modules/liturgia/domain/liturgia.repository.interface";
import { ILiturgia } from "../../../../../modules/liturgia/domain/liturgia.types";
import { LiturgiaMap } from "../../../../../modules/liturgia/infra/mappers/liturgia.map";
import { IUseCase } from "../../../../../shared/application/use-case.interface";
import { startOfDay, endOfDay } from 'date-fns';

class RecuperarTodasLiturgiasUseCase implements IUseCase<void, Array<ILiturgia>> {
    private _liturgiaRepositorio: ILiturgiaRepository<Liturgia>;

    constructor(repositorio: ILiturgiaRepository<Liturgia>) {
        this._liturgiaRepositorio = repositorio;
    }

    async execute(): Promise<ILiturgia[]> {
        const today = new Date();
        const start = startOfDay(today);  // Início do dia de hoje
        const end = endOfDay(today);      // Fim do dia de hoje

        // Recuperar todas as liturgias e filtrar pelas que possuem o campo 'dia' igual à data de hoje
        const todasLiturgias: Array<Liturgia> = await this._liturgiaRepositorio.recuperarTodos();

        // Filtrando as liturgias para pegar apenas aquelas que correspondem ao dia de hoje
        const liturgiasHoje = todasLiturgias.filter((liturgia) => {
            const dataLiturgia = new Date(liturgia.dia);  // Supondo que 'dia' é o campo que contém a data da liturgia
            return dataLiturgia >= start && dataLiturgia <= end; // Verifica se a data da liturgia é hoje
        });

        // Mapeando as liturgias para o formato DTO
        const liturgiasDTO = liturgiasHoje.map((liturgia) => LiturgiaMap.toDTO(liturgia));

        return liturgiasDTO;
    }
}

export { RecuperarTodasLiturgiasUseCase };
