import { Categoria } from "../../../../modules/categoria/domain/categoria.entity";
import { ICategoria, RecuperarCategoriaProps } from "../../../../modules/categoria/domain/categoria.types";
import { Prisma } from "@prisma/client";


class CategoriaMap {

    public static toDTO(categoria: Categoria): ICategoria {
        return {
          id: categoria.id,
          nome: categoria.nome
        }
    }

    public static toDomain(categoria: RecuperarCategoriaProps): Categoria {
        return Categoria.recuperar(categoria);
    }

    public static fromPrismaModelToDomain(CategoriaPrisma: Prisma.CategoriaCreateInput): Categoria {
        return CategoriaMap.toDomain({
          id: CategoriaPrisma.id,
          nome: CategoriaPrisma.nome
        });
    }

}

export { CategoriaMap };