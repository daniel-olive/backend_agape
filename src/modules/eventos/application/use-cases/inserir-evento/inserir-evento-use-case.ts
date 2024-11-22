import { Evento } from "../../../../../modules/eventos/domain/evento.entity";
import { IEventoRepository } from "../../../../../modules/eventos/domain/evento.repository.interface";
import { CriarEventoProps, IEvento } from "../../../../../modules/eventos/domain/evento.types";
import { EventoMap } from "../../../../../modules/eventos/infra/mappers/evento.map";
import { IUseCase } from "../../../../../shared/application/use-case.interface";

class InserirEventoUseCase implements IUseCase<CriarEventoProps, IEvento> {
    private _eventoRepositorio: IEventoRepository<Evento>;

    constructor(repositorio: IEventoRepository<Evento>) {
        this._eventoRepositorio = repositorio;
    }

    async execute(eventoProps: CriarEventoProps): Promise<IEvento> {
        // Criação do evento com os dados recebidos, incluindo o caminho do banner
        const evento: Evento = Evento.criar(eventoProps);

        // Insere o evento no repositório
        const eventoInserido = await this._eventoRepositorio.inserir(evento);

        // Mapeia o evento inserido para o DTO
        return EventoMap.toDTO(eventoInserido);
    }
}

export { InserirEventoUseCase };