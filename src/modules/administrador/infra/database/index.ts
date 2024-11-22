import { Administrador } from "../../../../modules/administrador/domain/administrador.entity";
import { IAdmRepository } from "../../../../modules/administrador/domain/administrador.repository.interface";
import { AdmPrismaRepository } from "./administrador.prisma.repository";
import { prisma } from "../../../../main/infra/database/orm/prisma/client";

const administradorRepositorio: IAdmRepository<Administrador> = new AdmPrismaRepository(prisma);

export { administradorRepositorio }