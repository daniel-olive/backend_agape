import { ApplicationException } from "../../../shared/application/application.exception";

class EventoApplicationException extends ApplicationException {
    constructor(message:string = '⚠️ Exceção de Aplicação Genérica da Entidade Categoria') {
        super(message);
        this.name = 'EventoApplicationException'
        this.message = message;
    }

    
}

class EventoNaoEncontrado extends EventoApplicationException {
    public constructor(message:string = '⚠️ O Evento não foi encontrada na base de dados.') {
        super(message);
        this.name = 'EventoNaoEncontrado'
        this.message = message;
    }
}

const EventoApplicationExceptions = {
    EventoNaoEncontrado: EventoNaoEncontrado
}



export { EventoApplicationExceptions }