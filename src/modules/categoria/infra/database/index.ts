import { prisma } from "../../../../main/infra/database/orm/prisma/client";
import { Categoria } from "../../../../modules/categoria/domain/categoria.entity";
import { CategoriaPrismaRepository } from "./categoria.prisma.repository";

const categoriaRepositorio = new CategoriaPrismaRepository(prisma);

export { categoriaRepositorio }