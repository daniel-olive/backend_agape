import { Evento } from "../../../../../modules/eventos/domain/evento.entity";
import { IEventoRepository } from "../../../../../modules/eventos/domain/evento.repository.interface";
import { IUseCase } from "../../../../../shared/application/use-case.interface";
import { EventoApplicationExceptions } from "../../evento.application.exception";


class DeletarEventoUseCase implements IUseCase<string,boolean> {
    private _eventoRepositorio: IEventoRepository<Evento>;

    constructor(repositorio: IEventoRepository<Evento>){
        this._eventoRepositorio = repositorio;
    }

    async execute(uuid: string): Promise<boolean> {

        const existeEvento: boolean = await this._eventoRepositorio.existe(uuid);

        if (!existeEvento){
            throw new EventoApplicationExceptions.EventoNaoEncontrado();
        }

        const deletouEvento:boolean = await this._eventoRepositorio.deletar(uuid);

        return deletouEvento;

    }

}

export { DeletarEventoUseCase }