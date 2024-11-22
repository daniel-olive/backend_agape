import { ApplicationException } from "../../../shared/application/application.exception";

class LiturgiaApplicationException extends ApplicationException {
    constructor(message:string = '⚠️ Exceção de Aplicação Genérica da Entidade Liturgia') {
        super(message);
        this.name = 'LiturgiaApplicationException'
        this.message = message;
    }


}

class LiturgiaNaoEncontrada extends LiturgiaApplicationException {
    public constructor(message:string = '⚠️ A Liturgia não foi encontrada na base de dados.') {
        super(message);
        this.name = 'LiturgiaNaoEncontrada'
        this.message = message;
    }
}

const LiturgiaApplicationExceptions = {
    LiturgiaNaoEncontrada: LiturgiaNaoEncontrada
}



export { LiturgiaApplicationExceptions }