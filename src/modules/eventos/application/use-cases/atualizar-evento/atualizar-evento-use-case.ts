
import { Evento } from "../../../../../modules/eventos/domain/evento.entity";
import { IEventoRepository } from "../../../../../modules/eventos/domain/evento.repository.interface";
import { RecuperarEventoProps } from "../../../../../modules/eventos/domain/evento.types";
import { IUseCase } from "../../../../../shared/application/use-case.interface";
import { EventoApplicationExceptions } from "../../evento.application.exception";

class AtualizarEventoUseCase implements IUseCase<RecuperarEventoProps, boolean> {
    private _eventoRepositorio: IEventoRepository<Evento>;

    constructor(repositorio: IEventoRepository<Evento>){
        this._eventoRepositorio = repositorio;
    }

    async execute(eventoProps: RecuperarEventoProps): Promise<boolean> {

        const existeEvento: boolean = await this._eventoRepositorio.existe(eventoProps.id);

        if (!existeEvento){
            throw new EventoApplicationExceptions.EventoNaoEncontrado();
        }

        const evento: Evento = Evento.recuperar(eventoProps);

        const atualizouEvento: boolean = await this._eventoRepositorio.atualizar(evento.id, evento);

        return atualizouEvento;

    }

}

export { AtualizarEventoUseCase }