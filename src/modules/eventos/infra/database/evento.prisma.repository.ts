import { Evento } from "../../../../modules/eventos/domain/evento.entity";
import { IEventoRepository } from "../../../../modules/eventos/domain/evento.repository.interface";
import { EventoMap } from "../../../../modules/eventos/infra/mappers/evento.map";
import { PrismaRepository } from "../../../../shared/infra/database/prisma.repository";

class EventoPrismaRepository extends PrismaRepository implements IEventoRepository<Evento> {

    
    async recuperarPorUuid(uuid: string): Promise<Evento | null> {
      
        const eventoRecuperado = await this._datasource.evento.findUnique(
            {
                where: {
                    id: uuid
                }
            }
        )
        if (eventoRecuperado) {
            return EventoMap.fromPrismaModelToDomain(eventoRecuperado);
        }
        return null;
    }

    async recuperarTodos(): Promise<Array<Evento>> {
        const eventosRecuperados = await this._datasource.evento.findMany();
        const eventos = eventosRecuperados.map(
            (evento) => EventoMap.fromPrismaModelToDomain(evento)
        );
        return eventos;
    }

    async existe(uuid: string): Promise<boolean> {
        const eventoExistente = await this.recuperarPorUuid(uuid);
		if (eventoExistente)  {return true;}
		return false;
    }

    async inserir(evento: Evento): Promise<Evento> {
        const eventoInserido = await this._datasource.evento.create(
            {
                data: {
                    id: evento.id,
                    titulo: evento.titulo,
                    descricao: evento.descricao,
                    local: evento.local,
                    data: evento.data,
                    horario: evento.horario,
                    banner: evento.banner
                }
            }
        );
        return evento;
    }

    async atualizar(uuid: string, evento: Evento): Promise<boolean> {
        const eventoAtualizado = await this._datasource.evento.update(
            {
                where: {id : uuid},
                data: {
                    titulo: evento.titulo,
                    descricao: evento.descricao,
                    local: evento.local,
                    data: evento.data,
                    horario: evento.horario,
                    banner: evento.banner
                }
            }
        );
        if (eventoAtualizado) {return true};
        return false;
    }

    async deletar(uuid: string): Promise<boolean> {
        const eventoDeletado = await this._datasource.evento.delete(
            {
                where: {
                    id: uuid
                }        
            }
        );
        if (eventoDeletado.id) {return true;}
        return false;
    }
}

export {EventoPrismaRepository}