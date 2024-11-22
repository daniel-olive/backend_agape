import { Prisma, TipoAdmPrisma } from "@prisma/client";
import { Administrador } from "../../domain/administrador.entity";
import { IAdministrador, RecuperarAdmProps, TipoAdm } from "../../domain/administrador.types";

class AdministradorMap {

    public static toDTO(administrador: Administrador): IAdministrador {
        return {
          id: administrador.id,
          nome: administrador.nome,
          email:  administrador.email,
          senha: administrador.senha,
          tipo: administrador.tipo
        }
    }

    public static toDomain(administrador: RecuperarAdmProps): Administrador {
        return Administrador.recuperar(administrador);
    }

    public static fromPrismaModelToDomain(AdministradorPrisma: Prisma.AdministradorCreateInput): Administrador {
        return AdministradorMap.toDomain({
          id: AdministradorPrisma.id,
          nome: AdministradorPrisma.nome,
          email: AdministradorPrisma.email,
          senha: AdministradorPrisma.senha,
          tipo: TipoAdm[AdministradorPrisma.tipo]
        });
    }

    public static toTipoAdmPrisma(tipo: TipoAdm): TipoAdmPrisma {
      return TipoAdmPrisma[tipo.toString() as keyof typeof TipoAdmPrisma];
  }
}

export { AdministradorMap };