import { IEventoRepository } from "../../../../modules/eventos/domain/evento.repository.interface";
import { EventoPrismaRepository } from "./evento.prisma.repository";
import { prisma } from "../../../../main/infra/database/orm/prisma/client";
import { Evento } from "../../../../modules/eventos/domain/evento.entity";

const eventoRepositorio: IEventoRepository<Evento> = new EventoPrismaRepository(prisma);

export {eventoRepositorio}