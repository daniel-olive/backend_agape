
import { Evento } from "../../../../../modules/eventos/domain/evento.entity";
import { IEventoRepository } from "../../../../../modules/eventos/domain/evento.repository.interface";
import { IEvento } from "../../../../../modules/eventos/domain/evento.types";
import { EventoMap } from "../../../../../modules/eventos/infra/mappers/evento.map";
import { IUseCase } from "../../../../../shared/application/use-case.interface";

class RecuperarTodosEventosUseCase implements IUseCase<void,Array<IEvento>> {
    private _eventoRepositorio: IEventoRepository<Evento>;

    constructor(repositorio: IEventoRepository<Evento>){
        this._eventoRepositorio = repositorio;
    }

    async execute(): Promise<IEvento[]> {

        const todosEventos: Array<Evento> = await this._eventoRepositorio.recuperarTodos();

        const todosEventosDTO = todosEventos.map(
            (evento) => EventoMap.toDTO(evento)
        );

        return todosEventosDTO;
    }

}

export { RecuperarTodosEventosUseCase }