
import { EventoMap } from "../../../../modules/eventos/infra/mappers/evento.map";
import { Inscricao } from "../../../../modules/inscricao/domain/inscricao.entity";
import { IInscricao, RecuperarInscricaoProps } from "../../../../modules/inscricao/domain/inscricao.types";
import { Prisma } from "@prisma/client";


class InscricaoMap {

    public static toDTO(inscricao: Inscricao): IInscricao {
        return {
          id: inscricao.id,
          nome: inscricao.nome,
          email: inscricao.email,
          grupo: inscricao.grupo,
          setor: inscricao.setor,
          eventId: inscricao.eventId,
          telefone: inscricao.telefone,
          idade: inscricao.idade
        }
    }

    public static toDomain(inscricao: RecuperarInscricaoProps): Inscricao {
        return Inscricao.recuperar(inscricao);
    }

    public static fromPrismaModelToDomain(InscricaoPrisma: Prisma.InscricaoCreateInput): Inscricao {
        return InscricaoMap.toDomain({
          id: InscricaoPrisma.id,
          nome: InscricaoPrisma.nome,
          email: InscricaoPrisma.email,
          grupo: InscricaoPrisma.grupo,
          setor: InscricaoPrisma.setor,
          eventId: InscricaoPrisma.evento?.connect?.id || "",
          telefone: InscricaoPrisma.telefone,
          idade: InscricaoPrisma.idade
        });
    }

}

export { InscricaoMap };