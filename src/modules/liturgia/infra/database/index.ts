import { prisma } from "../../../../main/infra/database/orm/prisma/client";
import { LiturgiaPrismaRepository } from "./liturgia.prisma.repository";
import { ILiturgiaRepository } from "../../../../modules/liturgia/domain/liturgia.repository.interface";
import { Liturgia } from "../../../../modules/liturgia/domain/liturgia.entity";


const liturgiaRepositorio: ILiturgiaRepository<Liturgia> = new LiturgiaPrismaRepository(prisma);

export { liturgiaRepositorio }