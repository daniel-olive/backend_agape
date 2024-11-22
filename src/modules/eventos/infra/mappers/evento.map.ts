import { Prisma } from "@prisma/client";
import { Evento } from "../../domain/evento.entity";
import { EditarEventoProps, IEvento, RecuperarEventoProps } from "../../domain/evento.types";

class EventoMap {

    public static toDTO(evento: Evento): IEvento {
        return {
            id: evento.id,
            titulo: evento.titulo,
            descricao: evento.descricao,
            local: evento.local,
            data: evento.data,
            horario: evento.horario,
            banner: evento.banner
        }
    }


    public static toDomain(evento: RecuperarEventoProps): Evento {
        return Evento.recuperar(evento);
    }

    public static fromPrismaModelToDomain(evento: Prisma.EventoCreateInput): Evento{
		return EventoMap.toDomain({
			id: evento.id,
			titulo: evento.titulo,
            descricao: evento.descricao,
            local: evento.local,
            data: evento.data,
            horario: evento.horario,
            banner: evento.banner
		});
	} 
}

export { EventoMap };
