import { Administrador } from "../../../../modules/administrador/domain/administrador.entity";
import { IAdmRepository } from "../../../../modules/administrador/domain/administrador.repository.interface";
import { PrismaRepository } from "../../../../shared/infra/database/prisma.repository";
import { AdministradorMap } from "../mappers/administrador.map";
import { CredenciaisAdmProps } from "../../../../modules/administrador/domain/administrador.types";
import bcrypt from "bcrypt"
import { logger } from "../../../../shared/helpers/logger.winston";

class AdmPrismaRepository extends PrismaRepository implements IAdmRepository<Administrador> {

    async autenticar(credenciais: CredenciaisAdmProps): Promise<boolean> {
        const administradorExistente = await this.recuperarPorEmail(credenciais.email);
        if (!administradorExistente) {return false;}

        const senhaValida: boolean = await bcrypt.compare(credenciais.senha, administradorExistente.senha);
        if (!senhaValida)  {return false;}

        return true;
    }

    async recuperarPorEmail(email: string): Promise<Administrador | null> {
        const administradorRecuperado = await this._datasource.administrador.findUnique(
            {
                where: {
                    email: email
                }
                
            }
            
        )
        
        if (administradorRecuperado) {
            return AdministradorMap.fromPrismaModelToDomain(administradorRecuperado);
        }
        return null;
    }

    async recuperarPorUuid(uuid: string): Promise<Administrador | null> {
        const administradorRecuperado = await this._datasource.administrador.findUnique(
            {
                where: {
                    id: uuid
                }
            }
        );
    
        if (administradorRecuperado) {
            const administradorDomain = AdministradorMap.fromPrismaModelToDomain(administradorRecuperado);
            
            // Aqui, você pode decidir retornar a senha em formato legível.
            // Porém, esteja ciente dos riscos de segurança ao fazer isso.
            administradorDomain.senha = administradorRecuperado.senha; // Coloca a senha "descriptografada" no objeto
    
            return administradorDomain;
        }
        return null;
    }

    async recuperarTodos(): Promise<Array<Administrador>> {
        const administradoresRecuperados = await this._datasource.administrador.findMany();
        const administradores = administradoresRecuperados.map(
            (administrador) => AdministradorMap.fromPrismaModelToDomain(administrador)
        );
        return administradores;
    }

    async existe(uuid: string): Promise<boolean> {
        const administradorExistente = await this.recuperarPorUuid(uuid);
		if (administradorExistente)  {return true;}
		return false;
    }


    async inserir(administrador: Administrador): Promise<Administrador> {
        const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS as string, 10);
        const senhaCriptografada = await bcrypt.hash(administrador.senha, saltRounds);

        const administradorInserido = await this._datasource.administrador.create(
            {
                data: {
                    id: administrador.id,
                    nome: administrador.nome,
                    email: administrador.email,
                    senha: senhaCriptografada,
                    tipo: AdministradorMap.toTipoAdmPrisma(administrador.tipo)

                }
            }
        );
        return administrador;
    }

    async atualizar(uuid: string, administrador: Administrador): Promise<boolean> {
        const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS as string, 10);
        const senhaCriptografada = await bcrypt.hash(administrador.senha, saltRounds);

        const administradorAtualizado = await this._datasource.administrador.update(
            {
                where: {id : uuid},
                data: {
                    nome: administrador.nome,
                    email: administrador.email,
                    senha: senhaCriptografada,
                    tipo: administrador.tipo
                }
            }
        );
        if (administradorAtualizado) {return true};
        return false;
    }

    async deletar(uuid: string): Promise<boolean> {
        const administradorDeletado = await this._datasource.administrador.delete(
            {
                where: {
                    id: uuid
                }        
            }
        );
        if (administradorDeletado.id) {return true;}
        return false;
    }
}

export {AdmPrismaRepository}