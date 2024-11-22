import { DomainException } from "../../../shared/domain/domain.exception";

class EventoException extends DomainException{
    constructor(message:string = "Exceção de dominio genérica da entidade evento"){
        super(message);
        this.name = "EventoException";
        this.message = message;
    }
}

class TituloEventoNuloOuIndefinido extends EventoException{
    public constructor(message:string = "O titulo do evento é nulo ou indefinido"){
        super(message);
        this.name = "TituloEventoNuloOuIndefinido";
        this.message = message;
    }

}

class TituloEventoTamanhoMinimoInvalido extends EventoException{
    public constructor(message:string = "O titulo do evento não possui um tamanho minimo válido"){
        super(message);
        this.name = "TituloEventoTamanhoMinimoInvalido";
        this.message = message;
    }

}

class TituloEventoTamanhoMaximoInvalido extends EventoException{
    public constructor(message:string = "O titulo do evento não possui um tamanho maximo válido"){
        super(message);
        this.name = "TituloEventoTamanhoMaximoInvalido";
        this.message = message;
    }

}

class DescricaoEventoNuloOuIndefinido extends EventoException{
    public constructor(message:string = "A descrição do evento é nulo ou indefinido"){
        super(message);
        this.name = "DescricaoEventoNuloOuIndefinido";
        this.message = message;
    }

}

class DescricaoEventoTamanhoMinimoInvalido extends EventoException{
    public constructor(message:string = "A descrição do evento não possui um tamanho minimo válido"){
        super(message);
        this.name = "DescricaoEventoTamanhoMinimoInvalido";
        this.message = message;
    }

}

class DescricaoEventoTamanhoMaximoInvalido extends EventoException{
    public constructor(message:string = "A descrição do evento não possui um tamanho maximo válido"){
        super(message);
        this.name = "DescricaoEventoTamanhoMaximoInvalido";
        this.message = message;
    }

}

class LocalEventoNuloOuIndefinido extends EventoException{
    public constructor(message:string = "O local do evento é nulo ou indefinido"){
        super(message);
        this.name = "LocalEventoNuloOuIndefinido";
        this.message = message;
    }

}

class LocalEventoTamanhoMinimoInvalido extends EventoException{
    public constructor(message:string = "O Local do evento não possui um tamanho minimo válido"){
        super(message);
        this.name = "LocalEventoTamanhoMinimoInvalido";
        this.message = message;
    }

}

class LocalEventoTamanhoMaximoInvalido extends EventoException{
    public constructor(message:string = "O Local do evento não possui um tamanho maximo válido"){
        super(message);
        this.name = "LocalEventoTamanhoMaximoInvalido";
        this.message = message;
    }

}

class DataEventoNuloOuIndefinido extends EventoException{
    public constructor(message:string = "A data do evento é nulo ou indefinido"){
        super(message);
        this.name = "DataEventoNuloOuIndefinido";
        this.message = message;
    }

}

class DataEventoFormatoInvalido extends EventoException{
    public constructor(message:string = "A data do evento está em um formato inválido"){
        super(message);
        this.name = "DataEventoFormatoInvalido";
        this.message = message;
    }

}

class HorarioEventoNuloOuIndefinido extends EventoException{
    public constructor(message:string = "O Horario do evento é nulo ou indefinido"){
        super(message);
        this.name = "HorarioEventoNuloOuIndefinido";
        this.message = message;
    }

}

class HorarioEventoTamanhoMinimoInvalido extends EventoException{
    public constructor(message:string = "O Horario do evento não possui um tamanho minimo válido"){
        super(message);
        this.name = "HorarioEventoTamanhoMinimoInvalido";
        this.message = message;
    }

}

class HorarioEventoTamanhoMaximoInvalido extends EventoException{
    public constructor(message:string = "O Horario do evento não possui um tamanho maximo válido"){
        super(message);
        this.name = "HorarioEventoTamanhoMaximoInvalido";
        this.message = message;
    }

}



class HorarioEventoFormatoInvalido extends EventoException{
    public constructor(message:string = "O Horario do evento está em um formato inválido"){
        super(message);
        this.name = "HorarioEventoFormatoInvalido";
        this.message = message;
    }

}

export{
    EventoException,
    TituloEventoNuloOuIndefinido,
    TituloEventoTamanhoMinimoInvalido,
    TituloEventoTamanhoMaximoInvalido,
    DescricaoEventoNuloOuIndefinido,
    DescricaoEventoTamanhoMinimoInvalido,
    DescricaoEventoTamanhoMaximoInvalido,
    LocalEventoNuloOuIndefinido,
    LocalEventoTamanhoMinimoInvalido,
    LocalEventoTamanhoMaximoInvalido,
    DataEventoNuloOuIndefinido,
    DataEventoFormatoInvalido,
    HorarioEventoNuloOuIndefinido,
    HorarioEventoFormatoInvalido,
    HorarioEventoTamanhoMinimoInvalido,
    HorarioEventoTamanhoMaximoInvalido
}