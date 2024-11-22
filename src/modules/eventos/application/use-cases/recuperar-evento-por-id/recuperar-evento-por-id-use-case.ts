import { Evento } from "../../../../../modules/eventos/domain/evento.entity";
import { IEventoRepository } from "../../../../../modules/eventos/domain/evento.repository.interface";
import { IEvento } from "../../../../../modules/eventos/domain/evento.types";
import { IUseCase } from "../../../../../shared/application/use-case.interface";
import { EventoApplicationExceptions } from "../../evento.application.exception";
import { EventoMap } from "../../../../../modules/eventos/infra/mappers/evento.map";


class RecuperarEventoPorIdUseCase implements IUseCase<string,IEvento> {

    private _eventoRepositorio: IEventoRepository<Evento>;

    constructor(eventoRepositorio:IEventoRepository<Evento>){
        this._eventoRepositorio = eventoRepositorio;
    }

    async execute(uuid: string): Promise<IEvento> {

        const existeEvento: boolean = await this._eventoRepositorio.existe(uuid);

        if (!existeEvento){
            throw new EventoApplicationExceptions.EventoNaoEncontrado();
        }

        const evento = await this._eventoRepositorio.recuperarPorUuid(uuid);

        return EventoMap.toDTO(evento as Evento);

    }

}

export { RecuperarEventoPorIdUseCase }