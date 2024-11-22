
import { Liturgia } from "../../../../modules/liturgia/domain/liturgia.entity";
import { ILiturgia, RecuperarLiturgiaProps } from "../../../../modules/liturgia/domain/liturgia.types";
import { Prisma } from "@prisma/client";


class LiturgiaMap {

    public static toDTO(liturgia: Liturgia): ILiturgia {
        return {
          id: liturgia.id,
          primeiraLeitura: liturgia.primeiraLeitura,
          segundaLeitura: liturgia.segundaLeitura,
          salmoResponsorial: liturgia.salmoResponsorial,
          titulo: liturgia.titulo,
          evangelho: liturgia.evangelho,
          corLiturgica: liturgia.corLiturgica,
          dia: liturgia.dia
        }
    }

    public static toDomain(liturgia: RecuperarLiturgiaProps): Liturgia {
        return Liturgia.recuperar(liturgia);
    }

    public static fromPrismaModelToDomain(LiturgiaPrisma: Prisma.LiturgiaCreateInput): Liturgia {
        return LiturgiaMap.toDomain({
          id: LiturgiaPrisma.id,
          primeiraLeitura: LiturgiaPrisma.primeiraLeitura,
          segundaLeitura: LiturgiaPrisma.segundaLeitura,
          salmoResponsorial: LiturgiaPrisma.salmoResponsorial,
          titulo: LiturgiaPrisma.titulo,
          evangelho: LiturgiaPrisma.evangelho,
          corLiturgica: LiturgiaPrisma.corLiturgica,
          dia: LiturgiaPrisma.dia
        });
    }

}

export { LiturgiaMap };