import { prisma } from "../../../../main/infra/database/orm/prisma/client";
import { InscricaoPrismaRepository } from "./inscricao.prisma.repository";


const inscricaoRepositorio = new InscricaoPrismaRepository(prisma);

export { inscricaoRepositorio }