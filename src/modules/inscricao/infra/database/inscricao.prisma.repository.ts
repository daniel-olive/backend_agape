import { Inscricao } from "../../../../modules/inscricao/domain/inscricao.entity";
import { PrismaRepository } from "../../../../shared/infra/database/prisma.repository";
import bcrypt from "bcrypt"
import { InscricaoMap } from "../mappers/inscricao.map";
import { Prisma } from "@prisma/client";


class InscricaoPrismaRepository extends PrismaRepository {

    
    async recuperarPorUuid(uuid: string): Promise<Inscricao | null> {
        const inscricaoRecuperada = await this._datasource.inscricao.findUnique(
            {
                where: {
                    id: uuid
                },
                include: Prisma.validator<Prisma.InscricaoInclude>()(
                    {
                        evento: true
                    }
                )
            }
        )
        if (inscricaoRecuperada) {
            return InscricaoMap.fromPrismaModelToDomain(inscricaoRecuperada as Prisma.InscricaoCreateInput);
        }
        return null;
    }

    async recuperarTodos(): Promise<Array<Inscricao>> {
        const inscricoesRecuperadas = await this._datasource.inscricao.findMany(
            {
                include: Prisma.validator<Prisma.InscricaoInclude>()(
                    {
                        evento: true
                    }
                )
            }
        );
        const inscricoes = inscricoesRecuperadas.map(
            (inscricao) => InscricaoMap.fromPrismaModelToDomain(inscricao as Prisma.InscricaoCreateInput)
        );
        return inscricoes;
    }

    async existe(uuid: string): Promise<boolean> {
        const inscricaoExistente = await this.recuperarPorUuid(uuid);
		if (inscricaoExistente)  {return true;}
		return false;
    }


    async inserir(inscricao: Inscricao): Promise<Inscricao> {
        const inscricaoInserida = await this._datasource.inscricao.create(
            {
                data: {
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
        );
        return inscricao;
    }

    async atualizar(uuid: string, inscricao: Inscricao): Promise<boolean> {
        const inscricaoAtualizada = await this._datasource.inscricao.update(
            {
                where: {id : uuid},
                data: {
                    nome: inscricao.nome,
                    email: inscricao.email,
                    grupo: inscricao.grupo,
                    setor: inscricao.setor,
                    eventId: inscricao.eventId,
                    telefone: inscricao.telefone,
                    idade: inscricao.idade
                }
            }
        );
        if (inscricaoAtualizada) {return true};
        return false;
    }

    async deletar(uuid: string): Promise<boolean> {
        const inscricaoDeletada = await this._datasource.inscricao.delete(
            {
                where: {
                    id: uuid
                }        
            }
        );
        if (inscricaoDeletada.id) {return true;}
        return false;
    }
}

export {InscricaoPrismaRepository}