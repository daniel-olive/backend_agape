import { prisma } from "../../../../main/infra/database/orm/prisma/client";
import { Conteudo } from "../../../../modules/conteudo/domain/conteudo.entity";
import { IConteudoRepository } from "../../../../modules/conteudo/domain/conteudo.repository.interface";
import { ConteudoPrismaRepository } from "./conteudo.prisma.repository";


const conteudorepositorio: IConteudoRepository<Conteudo> = new ConteudoPrismaRepository(prisma);

export {conteudorepositorio}